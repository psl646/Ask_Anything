var AppDispatcher = require('../dispatcher/dispatcher');
var SurveyApiUtil = require('../util/survey_api_util');

var ClientSurveyActions = {
  fetchAllSurveys: function () {
    SurveyApiUtil.fetchAllSurveys();
  }
};

module.exports = ClientSurveyActions;
