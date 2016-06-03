class Question < ActiveRecord::Base
  validates :question, :category, :survey_id, presence: true

  belongs_to(
    :survey,
    class_name: "Survey",
    foreign_key: :survey_id,
    primary_key: :id
  )

  has_one(
    :author,
    through: :survey,
    source: :author
  )

  has_many(
    :answers,
    class_name: "Answer",
    foreign_key: :question_id,
    primary_key: :id,
    dependent: :destroy
  )

end
