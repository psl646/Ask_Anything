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
var SurveysIndex = require('./components/SurveysIndex.jsx');
var QuestionIndexItem = require('./components/QuestionIndexItem.jsx');
var UserEditForm = require('./components/UserEditForm.jsx');
var UserEmailPasswordEditForm = require('./components/UserEmailPasswordEditForm.jsx');


var SessionStore = require('./stores/session_store.js');
var SessionApiUtil = require('./util/session_api_util.js');

// test component DELETE later
var Test = require('./components/test.jsx');


var Router = (
  <Router history={ hashHistory }>
    <Route path="/login" component={ LoginForm } onEnter={ _ensureLoggedOut } />
    <Route path="/" component={ App } >
      <Route path="signup" component={ SignupPage } onEnter={ _ensureLoggedOut } />
      <Route path="surveys" component={ SurveysIndex } onEnter={ _ensureLoggedIn }/> // Maybe take out this onEnter hook later to allow non-users to use the site
      <Route path="questions/:questionId" component={ QuestionIndexItem } onEnter={ _ensureLoggedIn }/>
      <Route path="profile/edit" component={ UserEditForm } onEnter={ _ensureLoggedIn }/>
      <Route path="profile/edit_password_or_email" component={ UserEmailPasswordEditForm } onEnter={ _ensureLoggedIn }/>
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

function _ensureLoggedOut(nextState, replace, asyncDoneCallback) {
  if (SessionStore.currentUserHasBeenFetched()) {
    redirectIfLoggedIn();
  } else {
    SessionApiUtil.fetchCurrentUser(redirectIfLoggedIn);
  }

  function redirectIfLoggedIn () {
    if(SessionStore.isUserLoggedIn()) {
      replace('/surveys');
    }
    asyncDoneCallback();
  }
}

document.addEventListener('DOMContentLoaded', function(){
  Modal.setAppElement(document.body);
  var root = document.getElementById('content');
  ReactDOM.render(Router, root);
});
