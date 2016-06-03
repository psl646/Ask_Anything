class AddUniqueEmailColumnToUsers < ActiveRecord::Migration
  def change
    add_column :users, :unique_email, :string
  end
end
