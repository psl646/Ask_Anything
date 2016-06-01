class Survey < ActiveRecord::Base
  validates :title, :author_id, presence: true
  validates :title, uniqueness: true

  belongs_to(
    :author,
    class_name: "User",
    foreign_key: :author_id,
    primary_key: :id
  )

end
