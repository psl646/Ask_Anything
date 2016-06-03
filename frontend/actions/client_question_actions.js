var AppDispatcher = require('../dispatcher/dispatcher');
var QuestionApiUtil = require('../util/question_api_util');

var ClientQuestionActions = {
  fetchAllQuestions: function (author_id) {
    QuestionApiUtil.fetchAllQuestions(author_id);
  },

  getQuestionById: function(question_id) {
    QuestionApiUtil.getQuestionById(question_id);
  }

};

module.exports = ClientQuestionActions;
