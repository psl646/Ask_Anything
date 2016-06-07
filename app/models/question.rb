class Question < ActiveRecord::Base
  validates :question, :category, :survey_id, presence: true
  validates :category, inclusion: { in: [
    "Multiple Choice",
    "Open Ended",
    "Q&A",
    "Ranking",
    "Clickable Image"
  ] }

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

  def self.create_questions (params, current_user)
    debugger
    questions_hash = params[:data][:questions]

    questions = []

    questions_hash.each { |_, val| questions.push(val) }


    Question.transaction do
      questions.each do |question_data|
        Question.create_single_question(params, question_data, current_user)
      end
    end
  end

  def self.create_single_question(params, question_data, current_user)
    asked_question = question_data[:question] || "[Blank Title]"

    survey = params[:data][:title].nil? ? current_user.surveys.first : current_user.surveys.last

    Question.create(
      question: asked_question,
      category: question_data[:category],
      survey: survey
    )

    question_data[:answers].each do |answer_data|
      answer_data.each do |_, val|
        Answer.create(answer: val, question: current_user.questions.last)
      end
    end
  end

end
