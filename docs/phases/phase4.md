# Phase 2: Questions Model, API, Flux Architecture, basic APIUtil, router (2 days)

## Rails
### Models
* Question

### Controllers
* Api::QuestionsController (create, index, show, update, destroy)

### Views
* api/questions/index.json.jbuilder
* api/questions/show.json.jbuilder

## Flux
### Views (React Components)
* SurveysIndex
  - QuestionIndexItem
    - Response
      - AnswersIndex
        - AnswerIndexItem
* QuestionForm

### Stores
* Question

### Actions
* ServerActions.receiveAllQuestions
* ServerActions.receiveSingleQuestion
* ServerActions.deleteQuestion

* ClientActions.fetchAllQuestions
* ClientActions.fetchSingleQuestion
* ClientActions.createQuestion
* ClientActions.editQuestion
* ClientActions.destroyQuestion

### ApiUtil
* ApiUtil.createQuestion
* ApiUtil.fetchAllQuestions
* ApiUtil.fetchSingleQuestion
* ApiUtil.editQuestion
* ApiUtil.destroyQuestion

## Gems/Libraries
