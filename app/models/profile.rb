class Profile < ActiveRecord::Base
  belongs_to :user
  has_many :cars

  validates :first_name, length: { minimum: 1 }, on: :update
  validates :last_name,  length: { minimum: 1 }, on: :update
end
