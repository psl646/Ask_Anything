class ChangeColumnInSurveys < ActiveRecord::Migration
  def change
    remove_column :surveys, :ungrouped
    add_column :surveys, :ungrouped, :string, default: "false"
  end
end
