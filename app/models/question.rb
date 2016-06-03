class Question < ActiveRecord::Base
  validates :question, :category, :survey_id, :author_id, presence: true

  belongs_to(
    :survey,
    class_name: "Survey",
    foreign_key: :survey_id,
    primary_key: :id
  )

  # has_one(
  #   :author,
  #   through: :survey,
  #   source: :author
  # )

  belongs_to(
    :author,
    class_name: "User",
    foreign_key: :author_id,
    primary_key: :id
  )
end
