class RenameProfileIdToOwnerIdInCars < ActiveRecord::Migration
  def change
    rename_column :cars, :profile_id, :owner_id
  end
end
