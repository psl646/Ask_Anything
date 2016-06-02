class CreateQuestions < ActiveRecord::Migration
  def change
    create_table :questions do |t|
      t.string :question, null: false
      t.string :type, null: false
      t.integer :survey_id, null: false

      t.timestamps null: false
    end
    add_index :questions, :survey_id
  end
end
