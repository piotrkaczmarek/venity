module Api
  module V1
    class CarsController < ApplicationController
      def create
        car = current_user.profile.cars.create(car_params)
        respond_with(car, serializer: CarSerializer)
      end

      def update
        car = current_user.profile.cars.find(params[:id])
        car.update_attributes(car_params)
        respond_with(car, serializer: CarSerializer)
      end

      private

      def car_params
        params.permit(:model, :make, :production_year)
      end
    end
  end
end
