var AppDispatcher = require('../dispatcher/dispatcher');
var QuestionFormConstants = require('../constants/question_form_constants');

var QuestionFormActions = {
  sendQuestionFormData: function (questionId, questionFormData) {
    AppDispatcher.dispatch({
      actionType: QuestionFormConstants.UPDATE_QUESTION_FORM,
      questionId: questionId,
      questionFormData: questionFormData
    });
  },

  deleteQuestion: function (questionId) {
    AppDispatcher.dispatch({
      actionType: QuestionFormConstants.DELETE_QUESTION_FORM,
      questionId: questionId
    });
  },

  clearQuestionForms: function() {
    AppDispatcher.dispatch({
      actionType: QuestionFormConstants.CLEAR_QUESTION_FORM
    });
  },

  addAnswerToQuestion: function(questionId, answerId, answer) {
    AppDispatcher.dispatch({
      actionType: QuestionFormConstants.ADD_ANSWER_QUESTION_FORM,
      questionId: questionId,
      answerId: answerId,
      answer: answer
    });
  },

  deleteAnswerToQuestion: function(questionId, answerId) {
    AppDispatcher.dispatch({
      actionType: QuestionFormConstants.DELETE_ANSWER_QUESTION_FORM,
      questionId: questionId,
      answerId: answerId
    });
  }
};

module.exports = QuestionFormActions;
