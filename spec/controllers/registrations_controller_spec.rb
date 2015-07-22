require 'rails_helper'

RSpec.describe RegistrationsController, type: :controller do
  before do
    @request.env['devise.mapping'] = Devise.mappings[:user]
    @request.env['warden'] = Warden::Proxy.new({}, warden_manager)
    Devise::Strategies::Rememberable.any_instance.stub(:remember_cookie)
  end
  describe 'POST #create' do
    let(:params) do
      {
        user: {
          email: FFaker::Internet.email,
          password: SecureRandom.hex(5),
          first_name: FFaker::Name.first_name,
          last_name: FFaker::Name.last_name
        },
        format: 'json'
      }
    end

    subject { post(:create, user_registration_path, params) }

    context 'when params are valid' do
      it 'creates a user' do
        expect { subject }.to change(User, :count).by(1)
      end

      it 'creates a profile' do
        expect { subject }.to change(Profile, :count).by(1)
      end
    end

    context 'when user params are not valid' do
      before { params[:user][:password] = '' }

      it 'returns error' do
        subject
        expect(json_response).to include('errors')
      end

      it 'returns 409 conflict' do
        subject
        expect(response.status).to eq(409)
      end

      it 'does not create new user' do
        expect { subject }.not_to change(User, :count)
      end

      it 'does not create new profile' do
        expect { subject }.not_to change(Profile, :count)
      end
    end

    context 'when profile params are not valid' do
      before { params[:user][:first_name] = '' }

      it 'returns error' do
        subject
        expect(json_response).to include('errors')
      end

      it 'returns 409 conflict' do
        subject
        expect(response.status).to eq(409)
      end

      it 'does not create new user' do
        expect { subject }.not_to change(User, :count)
      end

      it 'does not create new profile' do
        expect { subject }.not_to change(Profile, :count)
      end
    end

    context 'when both profile and user params are not valid' do
      before do
        params[:user][:password] = ''
        params[:user][:first_name] = ''
      end

      it 'returns errors for both fields' do
        subject
        expect(json_response['errors']).to include(*%w(password first_name))
      end
    end
  end
end
