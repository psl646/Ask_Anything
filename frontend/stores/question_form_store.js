var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var QuestionFormConstants = require('../constants/question_form_constants');

var QuestionFormStore = new Store(AppDispatcher);

var _questions = {};


var _addQuestionFormData = function (questionId, questionFormData) {
  _questions[questionId] = questionFormData;
};

var _deleteQuestion = function (questionId) {
  delete _questions[questionId];
};

var _resetQuestionStore = function () {
  _questions = {};
};

var _addAnswerToQuestion = function(questionId, answerId, answer) {
  var question = _questions[questionId];
  question["answers"][answerId] = answer;
};

QuestionFormStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case QuestionFormConstants.UPDATE_QUESTION_FORM:
      _addQuestionFormData(payload.questionId, payload.questionFormData);
      QuestionFormStore.__emitChange();
      break;
    case QuestionFormConstants.DELETE_QUESTION_FORM:
      _deleteQuestion(payload.questionId);
      QuestionFormStore.__emitChange();
      break;
    case QuestionFormConstants.CLEAR_QUESTION_FORM:
      _resetQuestionStore();
      QuestionFormStore.__emitChange();
      break;
    case QuestionFormConstants.ADD_ANSWER_QUESTION_FORM:
      _addAnswerToQuestion(payload.questionId, payload.answerId, payload.answer);
      QuestionFormStore.__emitChange();
      break;
  }
};

QuestionFormStore.getQuestionFormById = function (questionId) {
  return _questions[questionId];
};

QuestionFormStore.getAllQuestions = function () {
  return Object.assign({}, _questions);
};

QuestionFormStore.getAllAnswers = function (questionId) {
  var question = _questions[questionId];

  if (question) {
    return question["answers"];
  } else {
    return {};
  }
};

QuestionFormStore.getAnswer = function (questionId, answerId) {
  return _questions[questionId]["answers"][answerId];
};


module.exports = QuestionFormStore;
