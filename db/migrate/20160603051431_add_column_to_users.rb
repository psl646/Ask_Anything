class AddColumnToUsers < ActiveRecord::Migration
  def change
    add_column :users, :username, :string
    change_column :questions, :category, :string, null: false
  end
end
