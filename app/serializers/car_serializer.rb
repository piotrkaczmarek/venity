class CarSerializer < ActiveModel::Serializer
  attributes :id, :make, :model, :production_year, :photo
  has_one :owner, serializer: ProfileSerializer

  def photo
    {
      url: object.photo.url,
      thumb: object.photo.thumb.url
    }
  end
end
