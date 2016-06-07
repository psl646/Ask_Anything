class Response < ActiveRecord::Base
  validates :answer_id, presence: true

  belongs_to(
    :answer,
    class_name: "Answer",
    foreign_key: :answer_id,
    primary_key: :id
  )

  has_one(
    :question,
    through: :answer,
    source: :question
  )

  belongs_to(
    :user,
    class_name: "User",
    foreign_key: :user_id,
    primary_key: :id
  )
end
