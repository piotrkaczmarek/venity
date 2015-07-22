class Profile < ActiveRecord::Base
  belongs_to :user
  has_many :cars, foreign_key: :owner_id, dependent: :destroy

  validates :first_name, length: { minimum: 1 }
  validates :last_name,  length: { minimum: 1 }
end
