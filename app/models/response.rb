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

  ALPHABETS_HASH = {}
  ALPHABETS_ARRAY = ("a".."z").to_a

  ALPHABETS_ARRAY.each_with_index do |letter, idx|
    ALPHABETS_HASH[letter] = idx
  end

  # a question input is valid if the input is an integer and
  # if the integer is the id of an active question
  def is_valid_question_id?(question_input)
    return false unless is_valid_number?(question_input)
    current_question = Question.find_by_id(question_input.to_i)
    return false unless current_question
    return false if current_question[:active] == false
    # in order to not have to find the question again
    # we return the active question instance; the instance will be truthy
    current_question
  end

  def is_valid_number?(question_input)
    question_input.to_i.to_s == question_input
  end

  def is_valid_answer_choice?(answer_choice, valid_question)
    letter = answer_choice.downcase
    return false unless is_valid_letter?(letter)
    answer_idx = ALPHABETS_HASH[letter]
    current_answer = valid_question.answers[answer_idx]
    return false if current_answer.nil?
    # in order to not have to find the answer again
    # we return the answer instance; the instance will be truthy
    current_answer
  end

  def is_valid_letter?(letter)
    ALPHABETS_ARRAY.include?(letter)
  end
end
