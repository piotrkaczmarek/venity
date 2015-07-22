module Api
  module V1
    class RidesController < ApplicationController
      def index
        car = Car.find(params[:car_id])
        if car.owned_by?(current_user.profile_id)
          rides = car.rides
        else
          rides = car.rides.where(driver_id: current_user.profile_id)
        end
        respond_with(rides, each_serializer: RideSerializer)
      end

      def show
        car = Car.find(params[:car_id])
        ride = car.rides.find(params[:id])
        respond_with(ride, serializer: RideSerializer)
      end

      def create
        car = Car.find(params[:car_id])
        ride = car.rides.create(ride_params)
        respond_with(ride, serializer: RideSerializer)
      end

      private

      def ride_params
        params.permit(:start_datetime,
                      :end_datetime,
                      :start_lng,
                      :start_lat,
                      :end_lng,
                      :end_lat).merge(driver_id: current_user.profile_id)
      end
    end
  end
end
