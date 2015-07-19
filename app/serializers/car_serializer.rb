class CarSerializer < ActiveModel::Serializer
  attributes :id, :make, :model, :production_year
end
