var AppDispatcher = require('../dispatcher/dispatcher');
var SurveyConstants = require('../constants/survey_constants');

var ServerSurveyActions = {
  receiveAllSurveys: function (surveys) {
    AppDispatcher.dispatch({
      actionType: SurveyConstants.SURVEYS_RECEIVED,
      surveys: surveys
    });
  }
};

module.exports = ServerSurveyActions;
