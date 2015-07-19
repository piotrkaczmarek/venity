require 'rails_helper'

RSpec.describe Api::V1::ProfilesController, type: :request do
  describe 'GET #me' do
    let(:user) { create(:user) }

    context 'when logged in' do
      before { api_get(user, api_me_path) }

      it 'returns profile' do
        expect(json_response['profile']).to include(*%w(id first_name last_name))
      end
    end

    context 'when not logged in' do
      before { get(api_me_path, {}, api_headers) }

      it 'returns 401 unauthorized' do
        expect(response.status).to eq(401)
      end
    end
  end

  describe 'PUT #update' do
    let(:user) { create(:user) }

    subject { api_put(user, api_me_path, params) }

    context 'when params are valid' do
      let(:params) do
        {
          first_name: FFaker::Name.first_name,
          last_name: FFaker::Name.last_name
        }
      end

      it 'updates profile' do
        expect { subject }.to change { user.profile.first_name }
      end

      it 'returns updated profile' do
        subject
        expect(json_response['profile']['first_name']).to eq(params[:first_name])
      end
    end

    context 'when one param is not valid' do
      let(:params) do
        {
          first_name: '',
          last_name: FFaker::Name.last_name
        }
      end

      it 'does not update profile' do
        expect { subject }.to_not change { user.profile.reload.last_name }
      end

      it 'returns errors' do
        subject
        expect(json_response['errors']).to include('first_name')
      end
    end
  end
end
