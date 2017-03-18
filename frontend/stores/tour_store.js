var AppDispatcher = require('../dispatcher/dispatcher.js');
var Store = require('flux/utils').Store;
var TourConstants = require('../constants/tour_constants');

var TourStore = new Store(AppDispatcher);

var _currentPart = 0;

function _completePartOne(){
  _currentPart = 1;
}

function _completePartTwo(){
  _currentPart = 2;
}

function _completePartThree(){
  _currentPart = 3;
}

TourStore.getPart = function () {
	return _currentPart;
};

TourStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case TourConstants.PARTONECOMPLETE:
    	_completePartOne();
      break;
    case TourConstants.PARTTWOCOMPLETE:
    	_completePartTwo();
      break;
    case TourConstants.PARTTHREECOMPLETE:
    	_completePartThree();
      break;
  }
};

module.exports = TourStore;
