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

User.create(first_name: "Peter", last_name: "Lin", email: "peter.lin646@gmail.com", password: "password")
User.create(first_name: "Guest", last_name: "User", email: "guestuser@guest.com", password: "password")
User.create(first_name: "user123", last_name: "user123", email: "user123", password: "user123")

Question.create(question: "This question should be under Ungrouped", category: "Multiple Choice", survey_id: Survey.last.id)
Answer.create(answer: "Answer1 for Ungrouped", question: Question.last)
Response.create(answer: Answer.last)
Response.create(answer: Answer.last, user: User.last)
Response.create(answer: Answer.last, user: User.all[1])
Response.create(answer: Answer.last)
Answer.create(answer: "Answer2 for Ungrouped", question: Question.last)
Response.create(answer: Answer.last, user: User.last)
Response.create(answer: Answer.last)
Response.create(answer: Answer.last, user: User.first)


Survey.create(title: "New Survey", author: User.last)
Question.create(question: "This question should be under New Survey", category: "Multiple Choice", survey_id: Survey.last.id)
Answer.create(answer: "Answer1 for New Survey", question: Question.last)
Response.create(answer: Answer.last)
Response.create(answer: Answer.last, user: User.last)
Response.create(answer: Answer.last)
Answer.create(answer: "Answer2 for New Survey", question: Question.last)
Response.create(answer: Answer.last)
Response.create(answer: Answer.last, user: User.first)
Answer.create(answer: "Answer3 for New Survey", question: Question.last)
Response.create(answer: Answer.last, user: User.first)
