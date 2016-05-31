# Schema Information

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
first_name      | string    | not null
last_name       | string    | not null
email           | string    | not null, indexed, unique
password_digest | string    | not null
session_token   | string    | not null, indexed, unique
phone           | string    | optional; not really going to be used

## surveys
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
author_id   | integer   | foreign key (references users), indexed (hidden default when creating question w/o login)
title       | string    | not null

## questions
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
question    | string    | not null
type        | string    | not null
survey_id   | integer   | not null, foreign key (references surveys), indexed (hidden default when not selecting a survey)

## responses
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
question_id | integer   | not null, foreign key (references questions), indexed
answer_id   | integer   | not null, foreign key (references answers), indexed
user_id     | integer   | optional (anonymous answers)

## answers
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
question_id | integer   | not null, foreign key (references questions), indexed
answer      | string    | not null
