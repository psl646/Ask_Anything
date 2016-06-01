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
var SignupForm = require('./components/SignupForm.jsx');

var SessionStore = require('./stores/session_store.js');
var SessionApiUtil = require('./util/session_api_util.js');


// test component
var Test = require('./components/test.jsx');


var Router = (
  <Router history={ hashHistory }>
    <Route path="/" component={ App }>
      <Route path="login" component={ LoginForm } />
      <Route path="signup" component={ SignupPage } />
      <Route path="signupform" component={ SignupForm } />
      <Route path="test" component={ Test } />
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
  var root = document.getElementById('content');
  Modal.setAppElement(document.body);
  ReactDOM.render(Router, root);
});
