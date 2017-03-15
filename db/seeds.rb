# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.destroy_all
Survey.destroy_all
Question.destroy_all

def create_user(input_value)
  User.create(
    first_name: input_value,
    last_name: input_value,
    email: input_value,
    password: input_value
  )
end

create_user("apple123")
create_user("banana123")
create_user("mango123")
create_user("orange123")
create_user("pear123")
create_user("strawberry123")
create_user("watermelon123")
create_user("user123")

ALL_USERS = User.all
NUM_USERS = ALL_USERS.length

EVEN_USERS = ALL_USERS.select {|user| user.id % 2 == 0}
ODD_USERS = ALL_USERS.select {|user| user.id % 2 == 1}
FIRST_HALF_USERS = ALL_USERS.slice(0, NUM_USERS / 2)
SECOND_HALF_USERS = ALL_USERS.slice(NUM_USERS / 2, NUM_USERS)

def respond_to_last_question_with_last_answer(users_array)
  if (!users_array.is_a?(Array))
    users_array = [users_array]
  end
  users_array.each do |current_user|
    Response.create(answer: Answer.last, user: current_user)
  end
end

# UNGROUPED for user123
Question.create(question: "What is your favorite color?", category: "Multiple Choice", survey_id: Survey.last.id)
Answer.create(answer: "Blue", question: Question.last)
respond_to_last_question_with_last_answer(ODD_USERS)
Answer.create(answer: "Red", question: Question.last)
respond_to_last_question_with_last_answer(EVEN_USERS)
Answer.create(answer: "Yellow", question: Question.last)

Question.create(question: "What is your favorite season?", category: "Multiple Choice", survey_id: Survey.last.id)
Answer.create(answer: "Spring", question: Question.last)
respond_to_last_question_with_last_answer(ALL_USERS[0, 2])
Answer.create(answer: "Summer", question: Question.last)
respond_to_last_question_with_last_answer(ALL_USERS[2, 3])
Answer.create(answer: "Autumn", question: Question.last)
respond_to_last_question_with_last_answer(ALL_USERS[5, 2])
Answer.create(answer: "Winter", question: Question.last)
respond_to_last_question_with_last_answer(ALL_USERS.last)

Question.create(question: "Preferred Movie Genre", category: "Multiple Choice", survey_id: Survey.last.id)
Answer.create(answer: "Action", question: Question.last)
Answer.create(answer: "Animation", question: Question.last)
Answer.create(answer: "Comedy", question: Question.last)
respond_to_last_question_with_last_answer(ODD_USERS)
Answer.create(answer: "Drama", question: Question.last)
Answer.create(answer: "Horror", question: Question.last)
respond_to_last_question_with_last_answer(ALL_USERS.first)
Answer.create(answer: "Western", question: Question.last)

Question.create(question: "Do you put your toilet paper facing in or out?", category: "Multiple Choice", survey_id: Survey.last.id)
Answer.create(answer: "In", question: Question.last)
respond_to_last_question_with_last_answer(FIRST_HALF_USERS)
Answer.create(answer: "Out", question: Question.last)
respond_to_last_question_with_last_answer(SECOND_HALF_USERS)

Question.create(question: "Apple Vs Android?", category: "Multiple Choice", survey_id: Survey.last.id)
Answer.create(answer: "Apple", question: Question.last)
respond_to_last_question_with_last_answer(FIRST_HALF_USERS)
Answer.create(answer: "Android", question: Question.last)
respond_to_last_question_with_last_answer(SECOND_HALF_USERS)

Question.create(question: "What's your favorite dinosaur?", category: "Multiple Choice", survey_id: Survey.last.id)
Answer.create(answer: "Tyrannosaurus Rex", question: Question.last)
respond_to_last_question_with_last_answer(FIRST_HALF_USERS)
Answer.create(answer: "Stegosaurus", question: Question.last)
respond_to_last_question_with_last_answer(ALL_USERS.last)
Answer.create(answer: "Triceratops", question: Question.last)
respond_to_last_question_with_last_answer(ALL_USERS[5,2])

#Survey for user 123
Survey.create(title: "a/A Questions", author: ALL_USERS.last)
Question.create(question: "Which pod do you like working at best?", category: "Multiple Choice", survey_id: Survey.last.id)
Answer.create(answer: "Bronx", question: Question.last)
respond_to_last_question_with_last_answer(EVEN_USERS)
Answer.create(answer: "Park Slope", question: Question.last)
Answer.create(answer: "West Village", question: Question.last)
respond_to_last_question_with_last_answer(ODD_USERS)
Answer.create(answer: "Cobble Hill", question: Question.last)

Question.create(question: "Which was the hardest assessment?", category: "Multiple Choice", survey_id: Survey.last.id)
Answer.create(answer: "General Programming", question: Question.last)
Answer.create(answer: "Card game", question: Question.last)
Answer.create(answer: "SQL", question: Question.last)
Answer.create(answer: "Rails", question: Question.last)
respond_to_last_question_with_last_answer(ALL_USERS.last)
Answer.create(answer: "JavaScript", question: Question.last)
Answer.create(answer: "React", question: Question.last)
Answer.create(answer: "CSS", question: Question.last)
respond_to_last_question_with_last_answer(ALL_USERS[0, 6])

Question.create(question: "JavaScript or Ruby?", category: "Multiple Choice", survey_id: Survey.last.id)
Answer.create(answer: "JavaScript", question: Question.last)
respond_to_last_question_with_last_answer(ALL_USERS[2, 5])
Answer.create(answer: "Ruby", question: Question.last)
respond_to_last_question_with_last_answer(ALL_USERS[0, 2])
