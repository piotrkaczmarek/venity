class CarSerializer < ActiveModel::Serializer
  attributes :id, :make, :model, :production_year, :photo, :accepted_rides
  has_one :owner, serializer: ProfileSerializer

  def accepted_rides
    object.rides.accepted.joins(:driver)
      .select(:id, :start_datetime, :end_datetime, :driver_id, 'profiles.first_name AS driver_name')
  end

  def photo
    {
      url: object.photo.url,
      thumb: object.photo.thumb.url
    }
  end
end
