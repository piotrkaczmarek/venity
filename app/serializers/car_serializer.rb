class CarSerializer < ActiveModel::Serializer
  attributes :id, :make, :model, :production_year, :photo, :active_rides
  has_one :owner, serializer: ProfileSerializer

  def active_rides
    object.rides.active.joins(:driver)
      .select(:id, :start_datetime, :end_datetime, :driver_id, 'profiles.first_name AS driver_name')
  end

  def photo
    {
      url: object.photo.url,
      thumb: object.photo.thumb.url
    }
  end
end
