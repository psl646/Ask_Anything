var SessionActions = require('./../actions/session_actions');
var ErrorActions = require('./../actions/error_actions');

var SessionApiUtil = {
	login: function (credentials) {
		$.ajax({
			url: '/api/session',
			type: 'POST',
			data: {user: credentials},
			success: function (currentUser) {
        console.log("Login success (SessionApiUtil#login)");
        SessionActions.receiveCurrentUser(currentUser);
      },
			error: function (xhr) {
			  console.log("Login error in SessionApiUtil#login");
        var errors = xhr.responseJSON;
	      ErrorActions.setErrors("login", errors);
			}
		});
	},

	logout: function () {
		console.log("You clicked the logout button");
		$.ajax({
			url: '/api/session',
			method: 'DELETE',
			success: function () {
        SessionActions.removeCurrentUser();
      },
			error: function () {
			  console.log("Logout error in SessionApiUtil#logout");
			}
		});
	},

	fetchCurrentUser: function (complete) {
		$.ajax({
			url: '/api/session',
			method: 'GET',
			success: function (currentUser) {
			  SessionActions.receiveCurrentUser(currentUser);
			},
			error: function (xhr) {
			  console.log("Error in SessionApiUtil#fetchCurrentUser");
			},
      complete: complete
		});
	}
};

module.exports = SessionApiUtil;
