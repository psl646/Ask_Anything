var SessionConstants = require('../constants/session_constants');
var SessionApiUtil = require('../util/session_api_util');
var SessionStore = require('../stores/session_store');
var AppDispatcher = require('../dispatcher/dispatcher');

var SessionActions = {

  receiveCurrentUser: function (currentUser) {
    AppDispatcher.dispatch({
      actionType: SessionConstants.LOGIN,
      currentUser: currentUser
    });
  },

  removeCurrentUser: function () {
    AppDispatcher.dispatch({
      actionType: SessionConstants.LOGOUT
    });
  },

  userFound: function () {
    AppDispatcher.dispatch({
      actionType: SessionConstants.USER_FOUND
    });
  }

};

module.exports = SessionActions;
