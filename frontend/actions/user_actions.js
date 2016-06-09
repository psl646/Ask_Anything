var UserConstants = require('../constants/user_constants');
var UserStore = require('../stores/user_store');
var AppDispatcher = require('../dispatcher/dispatcher');

var UserActions = {
  userFound: function (user) {
    AppDispatcher.dispatch({
      actionType: UserConstants.USER_FOUND,
      user: user
    });
  },

  clearUser: function () {
    AppDispatcher.dispatch({
      actionType: UserConstants.CLEAR_USER
    });
  }
};

module.exports = UserActions;
