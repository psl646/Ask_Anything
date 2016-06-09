class AddColumnToUser < ActiveRecord::Migration
  def change
    add_column :users, :active_question_id, :integer
  end
end
