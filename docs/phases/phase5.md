# Phase 5: Response

## Rails
### Models
* Response

### Controllers
* Api::ResponsesController (create, destroy, index, update)

### Views
* responses/index.json.jbuilder

## Flux
### Views (React Components)
* SurveysIndex
  - QuestionIndexItem
    - Response
      - AnswersIndex
        - AnswerIndexItem
* QuestionForm

### Stores
* Response

### Actions
* ApiActions.receiveAllResponses -> triggered by ApiUtil
* ApiActions.receiveSingleResponse
* ApiActions.deleteResponse
* ResponseActions.fetchAllResponses -> triggers ApiUtil
* ResponseActions.fetchSingleResponse
* ResponseActions.createResponse
* ResponseActions.updateResponse
* ResponseActions.destroyResponse

### ApiUtil
* ApiUtil.fetchAllResponses
* ApiUtil.fetchSingleResponse
* ApiUtil.createResponse
* ApiUtil.updateResponse
* ApiUtil.destroyResponse

## Gems/Libraries
