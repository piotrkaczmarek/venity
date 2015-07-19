require 'rails_helper'

RSpec.describe User, type: :model do
  describe '#create' do
    it 'creates Profile' do
      expect { create(:user) }.to change { Profile.count }.by(1)
    end
  end
end
