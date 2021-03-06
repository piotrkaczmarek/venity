class Car < ActiveRecord::Base
  belongs_to :owner, class_name: 'Profile'
  has_many :rides

  validates :make,  presence: true
  validates :model, presence: true
  validates :production_year, presence: true,
                              numericality: { less_than_or_equal_to: Time.zone.now.year }

  mount_uploader :photo, PhotoUploader

  scope :owned_by, -> (profile_id) { where(owner_id: profile_id) }

  def owned_by?(profile_id)
    profile_id == owner_id
  end
end
