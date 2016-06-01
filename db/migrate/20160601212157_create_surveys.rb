class CreateSurveys < ActiveRecord::Migration
  def change
    create_table :surveys do |t|
      t.string :title, null: false
      t.integer :author_id, null: false

      t.timestamps null: false
    end

    add_index :surveys, :author_id
    add_index :surveys, :title, unique: true
  end
end
