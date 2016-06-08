var AppDispatcher = require('../dispatcher/dispatcher');
var QuestionApiUtil = require('../util/question_api_util');

var ClientQuestionActions = {
  fetchAllQuestions: function () {
    QuestionApiUtil.fetchAllQuestions();
  },

  getQuestionById: function(question_id) {
    QuestionApiUtil.getQuestionById(question_id);
  },

  createQuestions: function(formData) {
    QuestionApiUtil.createQuestions(formData);
  },

  toggleActive: function(questionId) {
    QuestionApiUtil.toggleActive(questionId);
  }
};

module.exports = ClientQuestionActions;
