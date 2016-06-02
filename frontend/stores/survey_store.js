var AppDispatcher = require('../dispatcher/dispatcher.js');
var Store = require('flux/utils').Store;
var SurveyConstants = require('../constants/survey_constants');

var SurveyStore = new Store(AppDispatcher);

var _surveys = {};

var _resetSurveys = function(surveys) {
  _surveys = {};

  surveys.forEach(function(survey){
    _surveys[survey.id] = survey;
  });
};

SurveyStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case SurveyConstants.SURVEYS_RECEIVED:
      _resetSurveys(payload.surveys);
      SurveyStore.__emitChange();
      break;
  }
};

SurveyStore.all = function () {
  var allSurveys = Object.assign({}, _surveys);
  return allSurveys;
};

module.exports = SurveyStore;
