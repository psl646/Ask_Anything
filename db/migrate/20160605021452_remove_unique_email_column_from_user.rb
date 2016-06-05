class RemoveUniqueEmailColumnFromUser < ActiveRecord::Migration
  def change
    remove_column :users, :unique_email
  end
end
