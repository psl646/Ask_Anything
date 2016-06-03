var AppDispatcher = require('../dispatcher/dispatcher');
var QuestionConstants = require('../constants/question_constants');

var ServerQuestionActions = {
  receiveAllQuestions: function (questions) {
    AppDispatcher.dispatch({
      actionType: QuestionConstants.QUESTIONS_RECEIVED,
      questions: questions
    });
  },

  receiveQuestion: function (question) {
    AppDispatcher.dispatch({
      actionType: QuestionConstants.QUESTION_RECEIVED,
      question: question
    });
  }
};

module.exports = ServerQuestionActions;
