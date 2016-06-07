json.array! @surveys do |survey|
  json.id survey.id
  json.title survey.title
  json.author_id survey.author_id
  json.ungrouped survey.ungrouped
  json.question_count survey.questions.length
end
