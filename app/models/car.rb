class Car < ActiveRecord::Base
  belongs_to :profile

  validates :make,  presence: true
  validates :model, presence: true
  validates :production_year, presence: true
end
