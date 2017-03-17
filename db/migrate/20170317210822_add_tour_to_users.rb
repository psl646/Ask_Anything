class AddTourToUsers < ActiveRecord::Migration
  def change
    add_column :users, :tour, :string
  end
end
