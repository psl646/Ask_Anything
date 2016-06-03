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

  def self.createSurvey (params, current_user)
    survey_data = params[:survey]
    questions = params[:questions]

    Question.transaction do
      survey_data[:title] ||= "New Survey"
      create_survey(survey_data, questions, current_user)
    end
  end

  private

  def create_survey(survey_data, questions, current_user)
    Survey.create(title: survey_data[:title], author: current_user)

    questions.each do |question_data|
      asked_question = question_data[:question] || "[Blank Title]"

      Question.create(
      question: asked_question,
      category: question_data[:category],
      survey: Survey.last
      )

      question_data[:answers].each do |answer_data|
        Answer.create(answer: answer_data[:answer], question: Question.last)
      end
    end
  end

end
