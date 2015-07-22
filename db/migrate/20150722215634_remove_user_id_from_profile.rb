class RemoveUserIdFromProfile < ActiveRecord::Migration
  def up
    remove_column :profiles, :user_id
  end

  def down
    add_column :profiles, :user_id, :integer
    User.find_each do |user|
      Profile.find(user.profile_id).update_attributes!(user_id: user.id)
    end
  end
end
