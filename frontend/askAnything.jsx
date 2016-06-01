var React = require('react');
var ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var hashHistory = ReactRouter.hashHistory;

var Modal = require("react-modal");

var App = require('./components/App.jsx');
var LoginForm = require('./components/LoginForm.jsx');
var SignupPage = require('./components/SignupPage.jsx');

var SessionStore = require('./stores/session_store.js');
var SessionApiUtil = require('./util/session_api_util.js');


// test component DELETE later
var Test = require('./components/test.jsx');


var Router = (
  <Router history={ hashHistory }>
    <Route path="/" component={ App }>
      <Route path="login" component={ LoginForm } />
      <Route path="signup" component={ SignupPage } />
    </Route>
  </Router>
);

function _ensureLoggedIn(nextState, replace, asyncDoneCallback) {
  if (SessionStore.currentUserHasBeenFetched()) {
    redirectIfNotLoggedIn();
  } else {
    SessionApiUtil.fetchCurrentUser(redirectIfNotLoggedIn);
  }

  function redirectIfNotLoggedIn() {
    if (!SessionStore.isUserLoggedIn()) {
      replace('/login');
    }
    asyncDoneCallback();
  }
}

document.addEventListener('DOMContentLoaded', function(){
  Modal.setAppElement(document.body);
  var root = document.getElementById('content');
  ReactDOM.render(Router, root);
});
