var AppDispatcher = require('../dispatcher/dispatcher');
var ResponseApiUtil = require('../util/response_api_util');

var ResponseActions = {
  recordResponse: function(formData) {
    ResponseApiUtil.recordResponse(formData);
  }
};

module.exports = ResponseActions;
