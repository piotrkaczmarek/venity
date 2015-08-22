class SetStateToUnansweredForOldRides < ActiveRecord::Migration
  def up
    Ride.where(state: nil).update_all(state: :unanswered)
  end

  def down
  end
end
