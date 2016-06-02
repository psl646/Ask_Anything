var ServerSurveyActions = require('./../actions/server_survey_actions');

var SurveyApiUtil = {
  fetchAllSurveys: function () {
    $.ajax({
      url: 'api/surveys',
      type: 'GET',
      dataType: 'json',
      success: function (surveys) {
        console.log("FROM DB: " + surveys);
        ServerSurveyActions.receiveAllSurveys(surveys);
      }
    })
  }
};

module.exports = SurveyApiUtil;
