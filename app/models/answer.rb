class Answer < ActiveRecord::Base
  validates :answer, :question_id, presence: true

  belongs_to(
    :question,
    class_name: "Question",
    foreign_key: :question_id,
    primary_key: :id
  )
end
