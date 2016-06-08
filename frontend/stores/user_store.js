var AppDispatcher = require('../dispatcher/dispatcher.js');
var Store = require('flux/utils').Store;
var UserConstants = require('../constants/user_constants');

var UserStore = new Store(AppDispatcher);


var _user = {};

var _foundUser = function (user) {
  _user = user;
};

UserStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case UserConstants.USER_FOUND:
      console.log("USER STORE");
      _foundUser(payload.user);
      UserStore.__emitChange();
      break;
  }
};

UserStore.getUser = function () {
	return $.extend({}, _user);
};

module.exports = UserStore;
