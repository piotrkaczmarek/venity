module Api
  module V1
    class RidesController < ApplicationController
      def driven
        rides = Ride.without_states(:rejected, :ended)
                .where(driver_id: current_user.profile_id)
        respond_with(rides, each_serializer: RideSerializer)
      end

      def owned
        rides = Ride.without_states(:rejected, :ended).owned_by(current_user.profile_id)
        respond_with(rides, each_serializer: RideSerializer)
      end

      def create
        car = Car.find(params[:car_id])
        ride = car.rides.create(ride_params)
        respond_with(ride, serializer: RideSerializer)
      end

      def accept
        ride = Ride.with_state(:unanswered).find(params[:id])
        return forbidden! unless ride.car.owned_by?(current_user.profile_id)
        ride.accept
        respond_with(ride, serializer: RideSerializer)
      end

      def reject
        ride = Ride.with_state(:unanswered).find(params[:id])
        return forbidden! unless ride.car.owned_by?(current_user.profile_id)
        ride.reject
        respond_with(ride, serializer: RideSerializer)
      end

      def cancel
        ride = Ride.with_state(:unanswered).find(params[:id])
        return forbidden! unless ride.driver_id == current_user.profile_id
        ride.cancel
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
