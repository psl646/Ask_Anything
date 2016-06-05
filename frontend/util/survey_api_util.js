var ServerSurveyActions = require('./../actions/server_survey_actions');

var SurveyApiUtil = {
  fetchAllSurveys: function () {
    $.ajax({
      url: 'api/surveys',
      type: 'GET',
      dataType: 'json',
      success: function (surveys) {
        ServerSurveyActions.receiveAllSurveys(surveys);
      },
      error: function () {
        console.log("Fetching error in SurveyApiUtil#fetchAllSurveys");
      }
    });
  },

  createSurvey: function (formData) {
    $.ajax({
      url: 'api/surveys',
      type: 'POST',
      dataType: 'json',
      data: { data: formData },
      success: function (surveys) {
        ServerSurveyActions.receiveAllSurveys(surveys);
      },
      error: function (xhr) {
        console.log("POST Error in SurveyApiUtil#createSurvey");
        var errors = xhr.responseJSON;
        ErrorActions.setErrors(errors);
      }
    });
  }
};

module.exports = SurveyApiUtil;
