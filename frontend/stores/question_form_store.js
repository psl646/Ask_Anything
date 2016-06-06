var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var QuestionFormConstants = require('../constants/question_form_constants');

var QuestionFormStore = new Store(AppDispatcher);

var _questions = { };


var _addQuestion = function (questionFormData) {

};

var _updateQuestion = function (questionFormData) {

};

var _deleteQuestion = function (questionFormData) {

};

var _deleteAllQuestions = function (questionFormData) {

};

QuestionFormStore.getAllQuestions = function () {
  return Object.assign({}, _questions);
};

QuestionFormStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case QuestionFormConstants.ADD_QUESTION_FORM:
      _resetErrors(payload.errors);
      QuestionFormStore.__emitChange();
      break;

  }
};

module.exports = QuestionFormStore;
