module Api
  module V1
    class PhotosController < ApplicationController
      def create
        car = Car.owned_by(current_user.profile_id).find(params[:car_id])
        car.photo = params[:file]
        car.save
        respond_with(car)
      end
    end
  end
end
