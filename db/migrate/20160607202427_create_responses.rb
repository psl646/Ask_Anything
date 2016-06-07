class CreateResponses < ActiveRecord::Migration
  def change
    create_table :responses do |t|
      t.integer :answer_id, null: false
      t.integer :user_id

      t.timestamps null: false
    end
    add_index :responses, :answer_id
    add_index :responses, :user_id
  end
end
