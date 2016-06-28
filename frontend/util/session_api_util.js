var SessionActions = require('./../actions/session_actions');
var ErrorActions = require('./../actions/error_actions');

var SessionApiUtil = {
	login: function (credentials) {
		$.ajax({
			url: '/api/session',
			type: 'POST',
			data: {user: credentials},
			success: function (currentUser) {
        SessionActions.receiveCurrentUser(currentUser);
      },
			error: function (xhr) {
        var errors = xhr.responseJSON;
	      ErrorActions.setErrors(errors);
			}
		});
	},

	logout: function () {
		$.ajax({
			url: '/api/session',
			method: 'DELETE',
			success: function () {
        SessionActions.removeCurrentUser();
      },
			error: function () {
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
<<<<<<< HEAD
			error: function () {
=======
			error: function (xhr) {
>>>>>>> ec9142743abbca07be25bd6aadef6850048dc798
			},
      complete: complete
		});
	}
};

module.exports = SessionApiUtil;
