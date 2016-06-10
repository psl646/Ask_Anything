class AddTwitterToUser < ActiveRecord::Migration
  def change
    add_column :users, :twitter_uid, :integer
  end
end
