class RemoveTitleIndexColumnOnSurveys < ActiveRecord::Migration
  def change
    remove_column :surveys, :title
    add_column :surveys, :title, :string
  end
end
