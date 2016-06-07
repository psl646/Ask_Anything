var AppDispatcher = require('../dispatcher/dispatcher.js');
var Store = require('flux/utils').Store;
var QuestionConstants = require('../constants/question_constants');

var QuestionStore = new Store(AppDispatcher);

var _questions = {};
var _currentQuestion = {};

var _resetQuestions = function(questions) {
  _questions = {};

  questions.forEach(function(question){
    _questions[question.id] = question;
  });
};

var _setCurrentQuestion = function(question) {
  _currentQuestion[question.id] = question;
  console.log(question);
  console.log("Current question set in Store:");
  console.log(_currentQuestion[question.id]);
};

QuestionStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case QuestionConstants.QUESTIONS_RECEIVED:
      _resetQuestions(payload.questions);
      QuestionStore.__emitChange();
      break;
    case QuestionConstants.QUESTION_RECEIVED:
      _setCurrentQuestion(payload.question);
      QuestionStore.__emitChange();
      break;
  }
};

QuestionStore.all = function () {
  var allQuestions = Object.assign({}, _questions);
  return allQuestions;
};

QuestionStore.getNewQuestion = function () {
  var keys = Object.keys(_questions);
  var maxKey = Math.max.apply(null, keys);
  return _questions[maxKey];
};

QuestionStore.getQuestionById = function (questionId) {
  return _currentQuestion[questionId];
};

QuestionStore.findQuestionsCountBySurveyId = function (survey_id) {
  var count = 0;

  Object.keys(_questions).forEach(function(question_id){
    if (_questions[question_id].survey_id === survey_id) {
      count++;
    }
  });

  return count;
};

module.exports = QuestionStore;
