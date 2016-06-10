var AppDispatcher = require('../dispatcher/dispatcher');
var ResponseApiUtil = require('../util/response_api_util');

var ResponseActions = {
  recordResponse: function(formData) {
    ResponseApiUtil.recordResponse(formData);
  },

  deleteResponse: function(responseId) {
    ResponseApiUtil.deleteResponse(responseId);
  }
};

module.exports = ResponseActions;
