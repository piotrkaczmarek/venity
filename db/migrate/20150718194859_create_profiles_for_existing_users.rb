class CreateProfilesForExistingUsers < ActiveRecord::Migration
  def up
    User.find_each do |user|
      user.create_profile if user.profile.blank?
    end
  end

  def down
    User.find_each do |user|
      user.profile.destroy! if user.profile.present?
    end
  end
end
