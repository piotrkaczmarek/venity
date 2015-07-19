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
end
