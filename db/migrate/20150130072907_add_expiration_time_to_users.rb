class AddExpirationTimeToUsers < ActiveRecord::Migration
  def change
    add_column :users, :expiration_time, :timestamp
  end
end
