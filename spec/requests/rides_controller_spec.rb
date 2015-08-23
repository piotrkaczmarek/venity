require 'rails_helper'

RSpec.describe Api::V1::CarsController, type: :request do
  let(:owner) { create(:profile) }
  let(:car) { create(:car, owner: owner) }
  let(:driver) { create(:profile) }
  let(:returned_ids) { json_response['rides'].map { |r| r['id'] } }

  describe 'GET #driven' do
    let!(:ride_of_other_user) { create(:ride, car: car) }
    let!(:drivers_car) { create(:car, owner: driver) }
    let!(:ride_with_drivers_car) { create(:ride, car: drivers_car) }

    subject { api_get(driver.user, driven_api_rides_path) }

    context 'when driver has three rides with two different cars' do
      let!(:ride_1) { create(:ride, driver: driver, car: car) }
      let!(:ride_2) { create(:ride, driver: driver, car: car) }
      let!(:ride_3) { create(:ride, driver: driver) }

      it 'returns his rides where he is a driver' do
        subject
        expect(returned_ids).to include(*[ride_1, ride_2, ride_3].map(&:id))
        expect(json_response['rides'].count).to eq(3)
      end

      it 'does not return rides of his car' do
        subject
        expect(returned_ids).not_to include(ride_with_drivers_car.id)
      end

      it 'does not return rides of other users' do
        subject
        expect(returned_ids).not_to include(ride_of_other_user.id)
      end
    end

    context 'when driver has no rides' do
      it 'returns 404' do
        subject
        expect(response.status).to eq(404)
      end
    end
  end

  describe 'GET #owned' do
    let!(:ride_of_owner) { create(:ride, driver: owner) }
    let!(:ride_with_other_car) { create(:ride) }
    let!(:car_2) { create(:car, owner: owner) }

    subject { api_get(owner.user, owned_api_rides_path) }

    context 'when owner has four rides with two different cars' do
      let!(:ride_1) { create(:ride, car: car, driver: driver) }
      let!(:ride_2) { create(:ride, car: car, driver: driver) }
      let!(:ride_3) { create(:ride, car: car) }
      let!(:ride_4) { create(:ride, car: car_2) }

      it 'returns owner\'s car rides' do
        subject
        expect(returned_ids).to include(*[ride_1, ride_2, ride_3, ride_4].map(&:id))
      end

      it 'does not return rides of other owners' do
        subject
        expect(returned_ids).not_to include(ride_with_other_car)
      end

      it 'does not return rides where owner is a driver' do
        subject
        expect(returned_ids).not_to include(ride_of_owner)
      end
    end
  end

  describe 'PUT #accept' do
    let!(:ride) { create(:ride, car: car, driver: driver) }

    subject { api_put(user, accept_api_ride_path(ride)) }

    context 'as an owner' do
      let(:user) { owner.user }

      it 'returns 200' do
        subject
        expect(response.status).to eq(200)
      end

      it 'changes ride state to accepted' do
        expect { subject }.to change { ride.reload.state }.to('accepted')
      end

      context 'when called twice' do
        it 'changes ride state to accepted' do
          expect { 2.times { subject } }.to change { ride.reload.state }.to('accepted')
        end

        it 'returns first 200 and then 404' do
          api_put(user, accept_api_ride_path(ride))
          expect(response.status).to eq(200)
          api_put(user, accept_api_ride_path(ride))
          expect(response.status).to eq(404)
        end
      end
    end

    context 'as a driver' do
      let(:user) { driver.user }

      it 'returns 403' do
        subject
        expect(response.status).to eq(403)
      end

      it 'does not change ride state' do
        expect { subject }.not_to change { ride.reload.state }
      end
    end
  end

  describe 'PUT #reject' do
    let!(:ride) { create(:ride, car: car, driver: driver) }

    subject { api_put(user, reject_api_ride_path(ride)) }

    context 'as an owner' do
      let(:user) { owner.user }

      it 'returns 200' do
        subject
        expect(response.status).to eq(200)
      end

      it 'changes ride state to rejected' do
        expect { subject }.to change { ride.reload.state }.to('rejected')
      end

      context 'when called twice' do
        it 'changes ride state to rejected' do
          expect { 2.times { subject } }.to change { ride.reload.state }.to('rejected')
        end

        it 'returns first 200 and then 404' do
          api_put(user, reject_api_ride_path(ride))
          expect(response.status).to eq(200)
          api_put(user, reject_api_ride_path(ride))
          expect(response.status).to eq(404)
        end
      end
    end

    context 'as a driver' do
      let(:user) { driver.user }

      it 'returns 403' do
        subject
        expect(response.status).to eq(403)
      end

      it 'does not change ride state' do
        expect { subject }.not_to change { ride.state }
      end
    end
  end

  describe 'PUT #cancel' do
    let!(:ride) { create(:ride, car: car, driver: driver) }

    subject { api_put(user, cancel_api_ride_path(ride)) }

    context 'as a driver' do
      let(:user) { driver.user }

      it 'returns 200' do
        subject
        expect(response.status).to eq(200)
      end

      it 'changes ride state to canceled' do
        expect { subject }.to change { ride.reload.state }.to('canceled')
      end
    end

    context 'as an owner' do
      let(:user) { owner.user }

      it 'returns 403' do
        subject
        expect(response.status).to eq(403)
      end

      it 'does not change ride state' do
        expect { subject }.not_to change { ride.state }
      end
    end
  end

  describe 'POST #create' do
    let(:params) { attributes_for(:ride, car: nil, driver: nil) }

    subject { api_post(user, api_car_rides_path(car), params) }

    context 'when posted by owner' do
      let(:user) { owner.user }

      it 'does not create a new ride' do
        expect { subject }.not_to change(Ride, :count)
      end

      it 'returns errors' do
        subject
        expect(response.status).to eq(409)
        expect(json_response['errors']).to include('driver_id')
      end
    end

    context 'when posted by not owner' do
      let(:user) { driver.user }

      context 'when params are valid' do
        it 'creates a new ride' do
          expect { subject }.to change(Ride, :count).by(1)
        end

        it 'returns created ride' do
          subject
          expect(response.status).to eq(200)
          expect(json_response).to include('ride')
        end
      end

      context 'when params are not valid' do
        before do
          params[:start_datetime] = 'bad_input'
          params.delete(:end_lng)
        end

        it 'returns 409' do
          subject
          expect(response.status).to eq(409)
          expect(json_response['errors'].keys).to include('start_datetime', 'end_lng')
        end

        it 'does not create a new ride' do
          expect { subject }.not_to change(Ride, :count)
        end
      end
    end
  end
end
