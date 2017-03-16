var QuestionApiUtil = require('../util/question_api_util');

var ClientQuestionActions = {
  fetchAllQuestions: function () {
    QuestionApiUtil.fetchAllQuestions();
  },

  fetchQuestionsByQuery: function (search) {
    QuestionApiUtil.fetchQuestionsByQuery(search);
  },

  getQuestionById: function(question_id, location) {
    QuestionApiUtil.getQuestionById(question_id, location);
  },

  createQuestions: function(formData) {
    QuestionApiUtil.createQuestions(formData);
  },

  updateQuestion: function (formData) {
    QuestionApiUtil.updateQuestion(formData);
  },

  toggleActive: function(questionId) {
    QuestionApiUtil.toggleActive(questionId);
  },

  deleteQuestion: function(questionId) {
    QuestionApiUtil.deleteQuestion(questionId);
  }
};

module.exports = ClientQuestionActions;
