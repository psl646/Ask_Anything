# Phase 2: Survey Model (1 day)

## Rails
### Models
Survey

### Controllers
* Api::SurveysController (create, index, show, update, destroy)

### Views
* api/surveys/index.json.jbuilder
* api/surveys/show.json.jbuilder

## Flux
### Views (React Components)
* SurveysIndex
  - QuestionIndexItem
    - Response
      - AnswersIndex
        - AnswerIndexItem
* QuestionForm

### Stores
Survey

### Actions
* ServerActions.receiveAllSurveys
* ServerActions.receiveSingleSurvey
* ServerActions.deleteSurvey

* ClientActions.fetchAllSurveys
* ClientActions.fetchSingleSurvey
* ClientActions.createSurvey
* ClientActions.editSurvey
* ClientActions.destroySurvey

### ApiUtil
* ApiUtil.createSurvey
* ApiUtil.fetchAllSurveys
* ApiUtil.fetchSingleSurvey
* ApiUtil.editSurvey
* ApiUtil.destroySurvey

## Gems/Libraries
* npm
  - react
  - react-dom
  - react-router
  - flux
  - babel-core
  - babel-loader
  - babel-preset-react
  - Webpack
