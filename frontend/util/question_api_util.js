var ServerQuestionActions = require('./../actions/server_question_actions');

var QuestionApiUtil = {
  fetchAllQuestions: function () {
    $.ajax({
      url: 'api/questions',
      type: 'GET',
      dataType: 'json',
      success: function (questions) {
        ServerQuestionActions.receiveAllQuestions(questions);
      },
      error: function () {
			  console.log("Fetch error in QuestionApiUtil#fetchAllQuestions");
			}
    })
  },

  getQuestionById: function (question_id) {
    $.ajax({
      url: 'api/questions/' + question_id,
      type: 'GET',
      dataType: 'json',
      success: function (question) {
        ServerQuestionActions.receiveQuestion(question);
      },
      error: function () {
        console.log("Fetch error in QuestionApiUtil#getQuestionById");
      }
    })
  },

  createQuestions: function (formData) {
    $.ajax({
      url: 'api/questions',
      type: 'POST',
      dataType: 'json',
      data: { data: formData },
      success: function (question) {
        ServerQuestionActions.receiveQuestion(question);
      },
      error: function (xhr) {
        console.log("POST Error in QuestionApiUtil#createQuestions");
        var errors = xhr.responseJSON;
        ErrorActions.setErrors(errors);
      }
    })
  }
};

module.exports = QuestionApiUtil;
