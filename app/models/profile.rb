class Profile < ActiveRecord::Base
  has_one :user
  has_many :cars, foreign_key: :owner_id, dependent: :destroy
  has_many :rides, foreign_key: :driver_id

  validates :first_name, length: { minimum: 1 }
  validates :last_name,  length: { minimum: 1 }
end
