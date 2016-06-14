// var ServerResponseActions = require('./../actions/server_response_actions');
var ErrorActions = require('../actions/error_actions');
var ServerQuestionActions = require('../actions/server_question_actions');

var ResponseApiUtil = {
  recordResponse: function (formData) {
    $.ajax({
      url: 'api/responses',
      type: 'POST',
      dataType: 'json',
      data: ({ response: formData }),
      success: function (question) {
        ServerQuestionActions.receiveQuestion(question);
      },
      error: function (xhr) {
        var errors = xhr.responseJSON;
        ErrorActions.setErrors(errors);
      }
    })
  },

  deleteResponse: function (responseId) {
    $.ajax({
      url: 'api/responses/' + responseId,
      type: 'DELETE',
      dataType: 'json',
      success: function (question) {
        ServerQuestionActions.receiveQuestion(question);
      },
      error: function (xhr) {
        var errors = xhr.responseJSON;
        ErrorActions.setErrors(errors);
      }
    })
  }
};

module.exports = ResponseApiUtil;
