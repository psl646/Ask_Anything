# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.destroy_all
Survey.destroy_all

User.create(first_name: "Peter", last_name: "Lin", email: "Peter.Lin646@gmail.com", password: "password")
User.create(first_name: "test", last_name: "test", email: "test", password: "testing")
User.create(first_name: "user123", last_name: "user123", email: "user123", password: "user123")

Survey.create(title: "New Survey", author_id: User.all.last.id)
