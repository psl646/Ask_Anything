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

User.create(first_name: "Peter", last_name: "Lin", email: "peterlin", password: "password")
User.create(first_name: "Guest", last_name: "User", email: "guestuser@guest.com", password: "password")
User.create(first_name: "Guest2", last_name: "User2", email: "guestuser2@guest.com", password: "password")
User.create(first_name: "user123", last_name: "user123", email: "user123", password: "user123")

# UNGROUPED for user123
Question.create(question: "What is your favorite color?", category: "Multiple Choice", survey_id: Survey.last.id)
Answer.create(answer: "Blue", question: Question.last)
Answer.create(answer: "Red", question: Question.last)
Answer.create(answer: "Yellow", question: Question.last)

Question.create(question: "What is your favorite season?", category: "Multiple Choice", survey_id: Survey.last.id)
Answer.create(answer: "Spring", question: Question.last)
Answer.create(answer: "Summer", question: Question.last)
Answer.create(answer: "Autumn", question: Question.last)
Answer.create(answer: "Winter", question: Question.last)

Question.create(question: "Do you put your toilet paper facing in or out?", category: "Multiple Choice", survey_id: Survey.last.id)
Answer.create(answer: "In", question: Question.last)
Answer.create(answer: "Out", question: Question.last)

Question.create(question: "Apple Vs Android?", category: "Multiple Choice", survey_id: Survey.last.id)
Answer.create(answer: "Apple", question: Question.last)
Answer.create(answer: "Android", question: Question.last)

Question.create(question: "Preferred Movie Genre", category: "Multiple Choice", survey_id: Survey.last.id)
Answer.create(answer: "Action", question: Question.last)
Answer.create(answer: "Animation", question: Question.last)
Answer.create(answer: "Comedy", question: Question.last)
Answer.create(answer: "Drama", question: Question.last)
Answer.create(answer: "Horror", question: Question.last)
Answer.create(answer: "Western", question: Question.last)

#Survey for user 123
Survey.create(title: "a/A Questions", author: User.last)
Question.create(question: "Which pod do you like working at best?", category: "Multiple Choice", survey_id: Survey.last.id)
Answer.create(answer: "Bronx", question: Question.last)
Response.create(answer: Answer.last, user: User.first)
Answer.create(answer: "Cobble Hill", question: Question.last)
Response.create(answer: Answer.last, user: User.all[1])
Answer.create(answer: "Park Slope", question: Question.last)
Response.create(answer: Answer.last, user: User.all[2])
Answer.create(answer: "West Village", question: Question.last)
Response.create(answer: Answer.last, user: User.last)

Question.create(question: "Which was the hardest assessment?", category: "Multiple Choice", survey_id: Survey.last.id)
Answer.create(answer: "General Programming", question: Question.last)
Answer.create(answer: "BlackJack game", question: Question.last)
Answer.create(answer: "SQL ActiveRecord", question: Question.last)
Answer.create(answer: "Rails Auth", question: Question.last)
Response.create(answer: Answer.last, user: User.last)
Answer.create(answer: "Javascript", question: Question.last)
Answer.create(answer: "React", question: Question.last)
Answer.create(answer: "CSS", question: Question.last)
Response.create(answer: Answer.last, user: User.first)
Response.create(answer: Answer.last, user: User.all[1])
Response.create(answer: Answer.last, user: User.all[2])

Question.create(question: "Are you ready for the Job Search curriculum?", category: "Multiple Choice", survey_id: Survey.last.id)
Answer.create(answer: "Yes", question: Question.last)
Response.create(answer: Answer.last, user: User.first)
Response.create(answer: Answer.last, user: User.all[1])
Response.create(answer: Answer.last, user: User.all[2])
Response.create(answer: Answer.last, user: User.last)
Answer.create(answer: "No", question: Question.last)
