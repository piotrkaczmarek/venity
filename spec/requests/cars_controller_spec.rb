require 'rails_helper'

RSpec.describe Api::V1::CarsController, type: :request do
  let(:owner) { create(:user) }

  describe 'GET #index' do
    before { 2.times { create(:car, owner: owner.profile) } }

    subject { api_get(owner, api_cars_path) }

    it 'returns all cars' do
      subject
      expect(json_response['cars'].length).to eq(2)
    end
  end

  describe 'POST #create' do
    subject { api_post(owner, api_cars_path, params) }

    context 'when params are valid' do
      let(:params) { attributes_for(:car) }

      it 'creates a car' do
        expect { subject }.to change(Car, :count).by(1)
      end

      it 'returns a car' do
        subject
        expect(json_response['car']).to include(*%w(model make production_year))
      end
    end

    context 'when params are not valid' do
      let(:params) { {} }

      it 'does not create a car' do
        expect { subject }.not_to change(Car, :count)
      end

      it 'returns errors' do
        subject
        expect(json_response).to include('errors')
      end
    end
  end

  describe 'PUT #update' do
    let(:params) { attributes_for(:car) }

    subject { api_put(user, api_car_path(car), params) }

    context 'when car already exists' do
      let!(:car) { create(:car, owner: owner.profile) }

      context 'when requested by the owner' do
        let(:user) { owner }

        it 'updates the car' do
          expect { subject }.to change { car.reload.make }
        end

        it 'returns the updated car' do
          subject
          expect(json_response['car']['make']).to eq(params[:make])
        end

        it 'returns 200' do
          subject
          expect(response.status).to eq(200)
        end
      end

      context 'when requested by not an owner' do
        let(:user) { create(:user) }

        it 'does not update the car' do
          expect { subject }.not_to change { car.reload.make }
        end

        it 'returns 404' do
          subject
          expect(response.status).to eq(404)
        end
      end
    end

    context 'when car does not exists' do
      let(:user) { owner }
      let(:car) { 7 }

      it 'returns 404' do
        subject
        expect(response.status).to eq(404)
      end

      it 'does not create a car' do
        expect { subject }.not_to change(Car, :count)
      end
    end
  end

  describe 'DELETE #destroy' do
    let!(:car) { create(:car, owner: owner.profile) }

    subject { api_delete(owner, api_car_path(car)) }

    it 'deletes the car' do
      expect { subject }.to change(Car, :count).by(-1)
    end

    it 'returns 200' do
      subject
      expect(response.status).to eq(200)
    end
  end
end
