class AddActiveToQuestions < ActiveRecord::Migration
  def change
    add_column :questions, :active, :boolean, default: false
    add_index :questions, :active
  end
end
