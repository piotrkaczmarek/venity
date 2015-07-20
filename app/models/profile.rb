class Profile < ActiveRecord::Base
  has_one :user
  has_many :cars, foreign_key: :owner_id, dependent: :destroy

  validates :first_name, length: { minimum: 1 }, on: :update
  validates :last_name,  length: { minimum: 1 }, on: :update
end
