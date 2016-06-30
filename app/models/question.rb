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

  has_many(
    :responses,
    through: :answers,
    source: :responses
  )

  def self.create_questions (params, current_user)
    questions = params[:data][:questions]

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
      Answer.create(answer: answer_data.last, question: current_user.questions.last)
    end

    if Answer.last.question_id != Question.last.id
      raise "ERROR"
    end
  end

  def self.inactivate_other_questions(current_question, current_user)
    current_user.questions.each do |question|
      next if (question[:id] == current_question[:id])
      question[:active] = false
      question.save
    end
  end

  def self.updateQuestion(current_question, params, current_user)
    question = params[:question]
    Question.transaction do
      old_answers = current_question.answers
      current_answers = question[:oldAnswers]

      if current_answers.nil?
        old_answers.destroy_all
      else
        old_answers.each do |old_answer|
          if !current_answers.keys.include?(old_answer[:id].to_s)
            old_answer.destroy
          else
            old_answer[:answer] = current_answers[old_answer[:id].to_s]
            old_answer.save
          end
        end
      end

      if question[:answers]
        question[:answers].each do |answer_data|
          Answer.create(answer: answer_data.last, question: current_question)
        end
      end
      current_question[:question] = question[:question]
      current_question[:category] = question[:category]
      if current_question.answers.empty? && Answer.last.question_id != current_question.id
        raise "ERROR"
      else
        current_question.save
      end
    end

    true
  end
end
