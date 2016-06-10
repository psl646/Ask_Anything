var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var ErrorConstants = require('../constants/error_constants');
var ErrorStore = new Store(AppDispatcher);

var _errors = [];

var _resetErrors = function (errors) {
  _errors = errors;
};

ErrorStore.getErrors = function () {
  var result = _errors.map(function (currentError) {
    return currentError.error
  });

  return result;
};

ErrorStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case ErrorConstants.SET_ERRORS:
      _resetErrors(payload.errors);
      console.log("set errors is emitting");
      ErrorStore.__emitChange();
      break;
    case ErrorConstants.CLEAR_ERRORS:
      _errors = [];
      console.log("clear errors is emitting");
      ErrorStore.__emitChange();
      break;
  }
};

module.exports = ErrorStore;
