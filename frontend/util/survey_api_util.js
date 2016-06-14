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
        var errors = xhr.responseJSON;
        ErrorActions.setErrors(errors);
      }
    });
  }
};

module.exports = SurveyApiUtil;
