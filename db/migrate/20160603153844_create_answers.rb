class CreateAnswers < ActiveRecord::Migration
  def change
    create_table :answers do |t|
      t.string :answer, null: false
      t.integer :question_id, null: false

      t.timestamps null: false
    end

    add_index :answers, :question_id
  end
end
