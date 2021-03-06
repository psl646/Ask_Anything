# Ask Anything

[Heroku link][heroku] **NB:** This will be a link to your production site after Day 1.

[heroku]: http://ask--anything.herokuapp.com/#/

## Minimum Viable Product

Ask Anything is a web application inspired by Poll Everywhere that will be build using Ruby on Rails and React.js.  By the end of Week 9, this app will, at a minimum, satisfy the following criteria:

- [x] New account creation, login, and guest/demo login
- [X] Smooth, bug-free navigation
- [X] Adequate seed data to demonstrate the site's features
- [X] The minimally necessary features for a Poll Everywhere-inspired site:
            Survey/Question creation and saving
            Survey/Question editing
            Questions organized into ungrouped(single questions)/grouped(surveys)
            Website-enabled response - via a link/tinyurl
            Charts/analytics on results
- [X] Hosting on Heroku
- [X] CSS styling that is satisfactorily visually appealing and representative of the actual site's look/feel
- [X] A production README, replacing this README -- I'll write this later

## Product Goals and Priorities

Ask Anything will allow users to do the following:

- [X] Create an account (MVP)
- [x] Log in / Log out, including as a Guest/Demo User (MVP)
- [x] Create, read, edit, and delete Surveys (MVP)
- [x] Organize Questions within Surveys (MVP)
- [X] Create different types of Questions - multiple choice, T/F, Free Response, etc

## Design Docs
* [View Wireframes][views]
* [React Components][components]
* [Flux Cycles][flux-cycles]
* [API endpoints][api-endpoints]
* [DB schema][schema]

[views]: ./docs/views.md
[components]: ./docs/components.md
[flux-cycles]: ./docs/flux-cycles.md
[api-endpoints]: ./docs/api-endpoints.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: Backend setup and User Authentication (1 day)

**Objective:** Functioning rails project with Authentication

- [X] create new project
- [X] create `User` model
- [X] authentication
- [X] user signup/signin pages
- [X] user logout
- [X] seed the database with a guest user

### Phase 2: Survey Model, API, Flux Architecture, basic APIUtil, router (2 days)

**Objective:** Surveys can be created, read, edited and destroyed through
the UI.

- [X] create `Survey` model
- [X] set up validations
- [x] require user login before using Update after a survey is created
- [X] seed the database with a small amount of test data
- [x] CRUD API for surveys (`SurveysController`)
- [X] jBuilder views for surveys
- [X] setup Webpack & Flux scaffold
- [X] setup `APIUtil` to interact with the API
- [X] test out API interaction in the console.
- [x] setup the flux loop with skeleton files
- [x] setup React Router for browser/hash history
- implement each survey component, building out the flux loop as needed.
  - [x] `SurveysIndex`
  - [x] `SurveyIndexItem/QuestionsIndex`
  - [x] `QuestionForm`

### Phase 3: Start Styling (1 day)

**Objective:** Existing pages (sigup/signin/UI) will look good.

- [x] position elements on the page
- [X] add basic colors & styles
- [X] put in modals
- [X] follow Poll Everywhere's style - see wireframes

### Phase 4: Question Model (1 day)

**Objective:** Questions belong to Surveys, and can be viewed by survey.

- [x] create `Question` model
- build out API, Flux loop, and components for:
  - [X] Question CRUD
  - [X] adding questions to survey
  - [X] viewing questions by survey
- Use CSS to style new views

Phase 4 adds organization to the Questions. Questions belong to a Survey, which has its own `Index` view.

### Phase 5: Responses (2 days)

**Objective:** Questions can have multiple responses.

- [X] create `Response` model and join table
- build out API, Flux loop, and components for:
  - [X] fetching responses for survey/question
  - [X] adding responses to questions
  - [X] creating responses while adding to surveys

### Phase 6: Allow Complex Styling in Surveys/Questions (1 day)

**objective:** Enable complex styling of questions.

- Use CSS to set of the webpage presentation.

### Phase 7: Styling Cleanup and Seeding (1 day)

**objective:** Make the site feel more cohesive and awesome.

- [X] Get feedback on my UI from others
- [X] Refactor HTML classes & CSS rules
- [X] Add modals, transitions, and other styling flourishes.

### Bonus Features (TBD)
- [ ] Search through questions
- [X] Set lockout time on questions
- [ ] Changelogs for Surveys
- [ ] SMS

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
[phase-six]: ./docs/phases/phase6.md
[phase-seven]: ./docs/phases/phase7.md
