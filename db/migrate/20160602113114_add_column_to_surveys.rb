class AddColumnToSurveys < ActiveRecord::Migration
  def change
    add_column :surveys, :ungrouped, :boolean, default: false
  end
end
