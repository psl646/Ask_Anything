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
        console.log('UserApiUtil#createAccount error');
        var errors = xhr.responseJSON;
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
  }
};

module.exports = UserApiUtil;
