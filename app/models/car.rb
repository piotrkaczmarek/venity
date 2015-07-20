class Car < ActiveRecord::Base
  belongs_to :owner, class_name: 'Profile'

  validates :make,  presence: true
  validates :model, presence: true
  validates :production_year, presence: true,
                              numericality: { less_than_or_equal_to: Time.zone.now.year }
end
