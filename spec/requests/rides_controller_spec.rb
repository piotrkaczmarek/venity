require 'rails_helper'

RSpec.describe Api::V1::CarsController, type: :request do
  let(:owner) { create(:profile) }
  let(:car) { create(:car, owner: owner) }
  let(:driver) { create(:profile) }

  describe 'GET #index' do
    let!(:ride_1) { create(:ride, car: car) }
    let!(:ride_2) { create(:ride, car: car, driver: driver) }
    let!(:ride_3) { create(:ride) }
    let!(:ride_4) { create(:ride, driver: driver) }

    subject { api_get(user, api_car_rides_path(car)) }

    context 'when requested by driver' do
      let(:user) { driver.user }

      it 'returns driver rides for given car' do
        subject
        expect(json_response['rides'].map { |r| r['id'] }).to include(ride_2.id)
        expect(json_response['rides'].count).to eq(1)
      end
    end

    context 'when requested by owner' do
      let(:user) { owner.user }

      it 'returns all car rides' do
        subject
        expect(json_response['rides'].map { |r| r['id'] }).to include(ride_1.id, ride_2.id)
        expect(json_response['rides'].count).to eq(2)
      end
    end

    context 'when requested by not involved user' do
      let(:user) { create(:profile).user }

      it 'returns 404' do
        subject
        expect(response.status).to eq(404)
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

      it 'creates a new ride' do
        expect { subject }.to change(Ride, :count).by(1)
      end

      it 'returns created ride' do
        subject
        expect(response.status).to eq(200)
        expect(json_response).to include('ride')
      end
    end
  end
end
