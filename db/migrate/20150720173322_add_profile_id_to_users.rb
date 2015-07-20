class AddProfileIdToUsers < ActiveRecord::Migration
  def up
    add_column :users, :profile_id, :integer
    Profile.find_each do |profile|
      User.find(profile.user_id).update_attributes!(profile_id: profile.id)
    end
  end

  def down
    remove_column :users, :profile_id
  end
end
