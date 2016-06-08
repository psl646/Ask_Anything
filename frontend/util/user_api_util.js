var SessionActions = require('./../actions/session_actions');
var UserActions = require('./../actions/user_actions');
var ErrorActions = require('./../actions/error_actions');

var UserApiUtil = {
  signup: function (formData) {
    $.ajax({
      url: '/api/user',
      type: 'POST',
      dataType: 'json',
      data: {user: formData},
      success: function (currentUser) {
        SessionActions.receiveCurrentUser(currentUser);
      },
      error: function (xhr) {
        console.log('UserApiUtil#createAccount error');
        var errors = xhr.responseJSON;
        ErrorActions.setErrors(errors);
      }
    });
  },

  updateUserName: function (formData) {
    $.ajax({
      url: '/api/user',
      type: 'PATCH',
      dataType: 'json',
      data: {user: formData},
      success: function (currentUser) {
        SessionActions.receiveCurrentUser(currentUser);
        alert("Your profile was updated");
      },
      error: function (xhr) {
        console.log("Error in UserApiUtil#updateUserName");
        var errors = xhr.responseJSON;
        ErrorActions.setErrors(errors);
      }
    });
  },

  updateEmailPassword: function (formData) {
    $.ajax({
      url: '/api/user',
      type: 'PATCH',
      dataType: 'json',
      data: {user: formData},
      success: function (currentUser) {
        SessionActions.receiveCurrentUser(currentUser);
        alert("User information updated!");
      },
      error: function (xhr) {
        console.log("Error in UserApiUtil#updateEmailPassword");
        var errors = xhr.responseJSON;
        ErrorActions.setErrors(errors);
      }
    });
  },

  findUserByEmail: function (email) {
    $.ajax({
      url: '/api/user',
      type: 'GET',
      dataType: 'json',
      data: {user: email},
      success: function (user) {
        UserActions.userFound(user);
      },
      error: function (xhr) {
        console.log("Error in UserApiUtil#sendEmail");
        var errors = xhr.responseJSON;
        ErrorActions.setErrors(errors);
      }
    });
  },

  findUserByUsername: function (username) {
    $.ajax({
      url: '/api/user',
      type: 'GET',
      dataType: 'json',
      data: {username: username},
      success: function (user) {
        UserActions.userFound(user);
      },
      error: function (xhr) {
        console.log("Error in UserApiUtil#sendEmail");
        var errors = xhr.responseJSON;
        ErrorActions.setErrors(errors);
      }
    });
  }
};

module.exports = UserApiUtil;
