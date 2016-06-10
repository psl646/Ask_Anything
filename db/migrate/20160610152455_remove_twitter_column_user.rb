class RemoveTwitterColumnUser < ActiveRecord::Migration
  def change
    change_column :users, :twitter_uid, :string
  end
end
