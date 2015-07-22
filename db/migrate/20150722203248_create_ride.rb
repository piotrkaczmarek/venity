class CreateRide < ActiveRecord::Migration
  def change
    create_table :rides do |t|
      t.integer :driver_id
      t.integer :car_id
      t.datetime :start_datetime
      t.datetime :end_datetime
      t.float :start_lng
      t.float :start_lat
      t.float :end_lng
      t.float :end_lat
    end
  end
end
