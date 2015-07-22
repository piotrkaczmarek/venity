class Ride < ActiveRecord::Base
  belongs_to :driver, class_name: 'Profile'
  belongs_to :car

  validates :driver_id,      presence: true
  validates :car_id,         presence: true
  validates :start_datetime, presence: true
  validates :end_datetime,   presence: true
  validates :start_lng,      presence: true, if: proc { start_lat.present? }
  validates :start_lat,      presence: true, if: proc { start_lng.present? }
  validates :end_lng,        presence: true, if: proc { end_lat.present? }
  validates :end_lat,        presence: true, if: proc { end_lng.present? }
  validate :owner_cannot_be_driver
  validate :end_cannot_be_before_start
  validate :start_cannot_be_past

  private

  def owner_cannot_be_driver
    errors.add(:driver_id, 'Owner cannot be driver') if driver_id == car.owner_id
  end

  def end_cannot_be_before_start
    errors.add(:end_datetime, 'End date must be later than start') if start_datetime > end_datetime
  end

  def start_cannot_be_past
    errors.add(:start_datetime, 'Start date cannot be past') if start_datetime < 1.hour.ago
  end
end
