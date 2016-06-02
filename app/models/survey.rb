class Survey < ActiveRecord::Base
  validates :author_id, :ungrouped, presence: true
  validates :ungrouped, inclusion: { in: %w(true false) }

  belongs_to(
    :author,
    class_name: "User",
    foreign_key: :author_id,
    primary_key: :id
  )

end
