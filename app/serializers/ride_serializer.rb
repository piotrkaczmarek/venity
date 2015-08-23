class RideSerializer < ActiveModel::Serializer
  attributes :id, :car_id, :driver_id, :state,
             :start_location, :end_location, :start_datetime, :end_datetime
  has_one :driver, serializer: ProfileSerializer
  has_one :car, serializer: CarSerializer
end
