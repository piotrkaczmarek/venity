module Api
  module V1
    class ProfilesController < ApplicationController
      def me
        respond_with(current_user.profile, serializer: ProfileSerializer)
      end

      def update
        profile = current_user.profile
        profile.update_attributes(profile_params)
        respond_with(profile, serializer: ProfileSerializer)
      end

      private

      def profile_params
        params.permit(:first_name, :last_name)
      end
    end
  end
end
