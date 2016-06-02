class ChangeColumnOnQuestions < ActiveRecord::Migration
  def change
    remove_column :questions, :type
    add_column :questions, :category, :string
  end
end
