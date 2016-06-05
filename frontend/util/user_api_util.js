var SessionActions = require('./../actions/session_actions');
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
        console.log(xhr);
        console.log('UserApiUtil#createAccount error');
        var errors = xhr.responseJSON;
        console.log(errors);
        ErrorActions.setErrors("signup", errors);
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
      error: function () {
        console.log("Error in UserApiUtil#updateUserName");
      }
    })
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
      error: function () {
        console.log("Error in UserApiUtil#updateEmailPassword");
      }
    })
  }
};

module.exports = UserApiUtil;
