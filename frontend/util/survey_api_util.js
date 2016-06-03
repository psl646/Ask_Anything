var ServerSurveyActions = require('./../actions/server_survey_actions');

var SurveyApiUtil = {
  fetchAllSurveys: function () {
    $.ajax({
      url: 'api/surveys',
      type: 'GET',
      dataType: 'json',
      success: function (surveys) {
        console.log(surveys);
        ServerSurveyActions.receiveAllSurveys(surveys);
      },
      errors: function () {
        console.log("Fetching error in SurveyApiUtil#fetchAllSurveys");
      }
    })
  }
};

module.exports = SurveyApiUtil;
