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

User.create(first_name: "Peter", last_name: "Lin", email: "Peter.Lin646@gmail.com", password: "password")
User.create(first_name: "Guest", last_name: "User", email: "GuestUser@guest.com", password: "password")
User.create(first_name: "user123", last_name: "user123", email: "user123", password: "user123")

Question.create(question: "This question should be under Ungrouped", category: "MC", survey_id: Survey.last.id)

Survey.create(title: "New Survey", author_id: User.last.id)
Question.create(question: "This question should be under New Survey", category: "MC", survey_id: Survey.last.id)
