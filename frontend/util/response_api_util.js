// var ServerResponseActions = require('./../actions/server_response_actions');
var ErrorActions = require('../actions/error_actions');

var ResponseApiUtil = {
  recordResponse: function (formData) {
    $.ajax({
      url: 'api/responses',
      type: 'POST',
      dataType: 'json',
      data: ({ response: formData }),
      success: function (response) {

        // ServerResponseActions.receiveQuestion(response);
      },
      error: function (xhr) {
        console.log("POST Error in ResponseApiUtil#recordResponse");
        var errors = xhr.responseJSON;
        ErrorActions.setErrors(errors);
      }
    })
  },


};

module.exports = ResponseApiUtil;
