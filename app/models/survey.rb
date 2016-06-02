class Survey < ActiveRecord::Base
  validates :author_id, :ungrouped, presence: true
  validates :ungrouped, inclusion: { in: %w(true false) }

  belongs_to(
    :author,
    class_name: "User",
    foreign_key: :author_id,
    primary_key: :id
  )

  has_many(
    :questions,
    class_name: "Question",
    foreign_key: :survey_id,
    primary_key: :id,
    dependent: :destroy
  )

end
