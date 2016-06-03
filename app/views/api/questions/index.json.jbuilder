json.array! @questions do |current_question|
  json.id current_question.id
  json.question current_question.question
  json.category current_question.category
  json.survey_id current_question.survey_id
end
