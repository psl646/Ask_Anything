var TourConstants = require('../constants/tour_constants');
var AppDispatcher = require('../dispatcher/dispatcher');

var TourActions = {
  partOneComplete: function () {
    AppDispatcher.dispatch({
      actionType: TourConstants.PARTONECOMPLETE
    });
  },

  partTwoComplete: function () {
    AppDispatcher.dispatch({
      actionType: TourConstants.PARTTWOCOMPLETE
    });
  },

  partThreeComplete: function () {
    AppDispatcher.dispatch({
      actionType: TourConstants.PARTTHREECOMPLETE
    });
  }
};

module.exports = TourActions;
