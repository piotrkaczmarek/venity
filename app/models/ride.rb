class Ride < ActiveRecord::Base
  belongs_to :driver, class_name: 'Profile'
  belongs_to :car

  validates :driver_id,      presence: true
  validates :car_id,         presence: true
  validates :start_datetime, presence: true
  validates :end_datetime,   presence: true
  validates :start_lng,
            presence: true,
            numericality: { greater_than_or_equal_to: -180.0, less_than_or_equal_to: 180.0 }
  validates :start_lat,
            presence: true,
            numericality: { greater_than_or_equal_to: -180.0, less_than_or_equal_to: 180.0 }
  validates :start_location, presence: true
  validates :end_lng,
            presence: true,
            numericality: { greater_than_or_equal_to: -180.0, less_than_or_equal_to: 180.0 }
  validates :end_lat,
            presence: true,
            numericality: { greater_than_or_equal_to: -180.0, less_than_or_equal_to: 180.0 }
  validates :end_location, presence: true
  validate :owner_cannot_be_driver
  validate :end_cannot_be_before_start
  validate :start_cannot_be_past, on: :create
  validate :available?

  scope :owned_by, ->(profile_id) { includes(:car).where(cars: { owner_id: profile_id }) }
  scope :active, -> { where(state: %w(accepted started)) }

  state_machine initial: :unanswered do
    event :accept do
      transition unanswered: :accepted
    end

    event :reject do
      transition unanswered: :rejected
    end

    event :cancel do
      transition unanswered: :canceled
    end

    event :start do
      transition accepted: :started
    end

    event :end do
      transition started: :ended
    end

    state :accepted, :unanswered do
      validate { |ride| ride.available? }
    end
  end

  def available?
    car.reload.rides.active.find_each do |ride|
      next if ride.id == id
      if collides?(ride)
        errors.add(:start_datetime, 'Collides with earlier ride') unless starts_after(ride)
        errors.add(:end_datetime, 'Collides with later ride') unless ends_before(ride)
        return false
      end
    end
  end

  private

  def collides?(ride)
    !(ends_before(ride) || starts_after(ride))
  end

  def ends_before(ride)
    end_datetime < ride.start_datetime
  end

  def starts_after(ride)
    start_datetime > ride.end_datetime
  end

  def owner_cannot_be_driver
    return unless driver_id && car
    errors.add(:driver_id, 'Owner cannot be driver') if driver_id == car.owner_id
  end

  def end_cannot_be_before_start
    return unless start_datetime && end_datetime
    errors.add(:end_datetime, 'End date must be later than start') if start_datetime > end_datetime
  end

  def start_cannot_be_past
    return unless start_datetime
    errors.add(:start_datetime, 'Start date cannot be past') if start_datetime < 1.hour.ago
  end
end
