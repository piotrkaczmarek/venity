module Api
  module V1
    class CarsController < ApplicationController
      skip_before_action :authenticate_user!, only: [:index, :show]

      def index
        respond_with(Car.all, each_serializer: CarSerializer)
      end

      def show
        car = Car.find(params[:id])
        respond_with(car, serializer: CarSerializer)
      end

      def create
        car = current_profile.cars.create(car_params)
        respond_with(car, serializer: CarSerializer)
      end

      def update
        car = current_profile.cars.find(params[:id])
        car.update_attributes(car_params)
        respond_with(car, serializer: CarSerializer)
      end

      def destroy
        car = current_profile.cars.find(params[:id])
        car.destroy
        ack!('Car deleted')
      end

      private

      def car_params
        params.permit(:model, :make, :production_year)
      end
    end
  end
end
