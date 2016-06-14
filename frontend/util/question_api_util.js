var ServerQuestionActions = require('./../actions/server_question_actions');
var ErrorActions = require('../actions/error_actions');

var QuestionApiUtil = {
  fetchAllQuestions: function () {
    $.ajax({
      url: 'api/questions',
      type: 'GET',
      dataType: 'json',
      success: function (questions) {
        ServerQuestionActions.receiveAllQuestions(questions);
      },
      error: function (error) {
			}
    })
  },

  getQuestionById: function (question_id, location) {
    $.ajax({
      url: 'api/questions/' + question_id,
      type: 'GET',
      dataType: 'json',
      data: { location : location },
      success: function (question) {
        ServerQuestionActions.receiveQuestion(question);
      },
      error: function (xhr) {
        var errors = xhr.responseJSON;
        ErrorActions.setErrors(errors);
      }
    })
  },

  createQuestions: function (formData) {
    $.ajax({
      url: 'api/questions',
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({ data: formData }),
      success: function (question) {
        ServerQuestionActions.receiveQuestion(question);
      },
      error: function (xhr) {
        var errors = xhr.responseJSON;
        ErrorActions.setErrors(errors);
      }
    })
  },

  toggleActive: function (questionId) {
    $.ajax({
      url: 'api/questions/' + questionId,
      type: 'PATCH',
      dataType: 'json',
      data: {toggle: true},
      success: function (questions) {
        ServerQuestionActions.receiveAllQuestions(questions);
      },
      error: function (xhr) {
      }
    })
  },

  deleteQuestion: function (questionId) {
    $.ajax({
      url: 'api/questions/' + questionId,
      type: 'DELETE',
      dataType: 'json',
      success: function (questions) {
        ServerQuestionActions.receiveAllQuestions(questions);
      },
      error: function (xhr) {
      }
    })
  },

  updateQuestion: function (formData) {
    $.ajax({
      url: 'api/questions/' + formData.questionId,
      type: 'PATCH',
      dataType: 'json',
      data: { question: formData },
      success: function (question) {
        ServerQuestionActions.receiveQuestion(question);
      },
      error: function (xhr) {
      }
    })
  }
};

module.exports = QuestionApiUtil;
