module Api
  module V1
    class RidesController < ApplicationController
      def driven
        rides = Ride.where(driver_id: current_user.profile_id)
        respond_with(rides, each_serializer: RideSerializer)
      end

      def owned
        rides = Ride.joins(:car).where(cars: { owner_id: current_user.profile_id })
        respond_with(rides, each_serializer: RideSerializer)
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
