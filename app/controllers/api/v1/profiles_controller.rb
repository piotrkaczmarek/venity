module Api
  module V1
    class ProfilesController < ApplicationController
      def me
        respond_with(current_user.profile, serializer: ProfileSerializer)
      end
    end
  end
end
