# Flux Cycles

Flux loops are organized by data type. Under each data type, there may
be sub-categories, and each action is listed with the sequence of events
that result from its invocation, ending with the API or store. Finally,
store listeners are listed at the end.

You should be able to use this document trace an **action** starting
with where it was invoked, through the **API**/**store** involved, and
finally to the **components** that update as a result. This is important
because once you start implementing your flux loops, that's precisely
what you'll need to do.


## Question Cycles

### Questions API Request Actions

* `createQuestion`
  0. invoked from new question button `onClick`
  0. `POST /api/questions` is called.
  0. `receiveSingleQuestion` is set as the callback.

* `fetchAllQuestions`
  0. invoked from `SurveysIndex` `componentDidMount`/`componentWillReceiveProps`
  0. `GET /api/questions` is called.
  0. `receiveAllQuestions` is set as the callback.

* `fetchSingleQuestion`
  0. invoked from `QuestionIndexItem` `componentDidMount`/`componentWillReceiveProps`
  0. `GET /api/questions/:id` is called.
  0. `receiveSingleQuestion` is set as the callback.

* `updateQuestion`
  0. invoked from `QuestionForm` `onSubmit`
  0. `POST /api/questions` is called.
  0. `receiveSingleQuestion` is set as the callback.

* `destroyQuestion`
  0. invoked from delete question button `onClick`
  0. `DELETE /api/questions/:id` is called.
  0. `removeQuestion` is set as the callback.

### Questions API Response Actions

* `receiveAllQuestions`
  0. invoked from an API callback.
  0. `Question` store updates `_questions` and emits change.

* `receiveSingleQuestion`
  0. invoked from an API callback.
  0. `Question` store updates `_questions[id]` and emits change.

* `removeQuestion`
  0. invoked from an API callback.
  0. `Question` store removes `_questions[id]` and emits change.

### Store Listeners

* `QuestionsIndex` component listens to `Question` store.
* `QuestionIndexItem` component listens to `Question` store.


## Survey Cycles

### Surveys API Request Actions

* `fetchAllSurveys`
  0. invoked from `SurveysIndex` `componentDidMount`/`willReceiveProps`
  0. `GET /api/survey` is called.
  0. `receiveAllSurveys` is set as the callback.

* `createSurvey`
  0. invoked from new survey button `onClick`
  0. `POST /api/survey` is called.
  0. `receiveSingleSurvey` is set as the callback.

* `fetchSingleSurvey`
  0. invoked from `SurveyIndexItem` `componentDidMount`/`willReceiveProps`
  0. `GET /api/survey/:id` is called.
  0. `receiveSingleSurvey` is set as the callback.

* `updateSurvey`
  0. invoked from `SurveyForm` `onSubmit`
  0. `POST /api/survey` is called.
  0. `receiveSingleSurvey` is set as the callback.

* `destroySurvey`
  0. invoked from delete survey button `onClick`
  0. `DELETE /api/survey/:id` is called.
  0. `removeSurvey` is set as the callback.

### Surveys API Response Actions

* `receiveAllSurveys`
  0. invoked from an API callback.
  0. `Survey` store updates `_survey` and emits change.

* `receiveSingleSurvey`
  0. invoked from an API callback.
  0. `Survey` store updates `_survey[id]` and emits change.

* `removeSurvey`
  0. invoked from an API callback.
  0. `Survey` store removes `_survey[id]` and emits change.

### Store Listeners

* `SurveysIndex` component listens to `Survey` store.
