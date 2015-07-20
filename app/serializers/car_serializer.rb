class CarSerializer < ActiveModel::Serializer
  attributes :id, :make, :model, :production_year
  has_one :owner, serializer: ProfileSerializer
end
