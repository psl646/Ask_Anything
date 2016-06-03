class Question < ActiveRecord::Base
  validates :question, :category, :survey_id, presence: true
  validates :category, inclusion: { in: %w(multiple_choice open_ended q_and_a ranking clickable_image) }

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

  def self.createQuestion (params, current_user)
    questions = params[:questions]

    Question.transaction do
      questions.each do |question_data|
        create_single_question(question_data, current_user)
      end
    end
  end

  private

  def create_single_question(question_data, current_user)
    asked_question = question_data[:question] || "[Blank Title]"

    Question.create(
      question: asked_question,
      category: question_data[:category],
      survey: current_user.surveys.first
    )

    question_data[:answers].each do |answer_data|
      Answer.create(answer: answer_data[:answer], question: Question.last)
    end
  end

end
