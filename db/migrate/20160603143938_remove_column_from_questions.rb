class RemoveColumnFromQuestions < ActiveRecord::Migration
  def change
    remove_column :questions, :author_id
  end
end
