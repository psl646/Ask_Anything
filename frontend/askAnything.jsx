var React = require('react');
var ReactDOM = require('react-dom');
var Modal = require("react-modal");

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var hashHistory = ReactRouter.hashHistory;


var App = require('./components/App.jsx');
var LoginForm = require('./components/LoginForm.jsx');
var SignupPage = require('./components/SignupPage.jsx');
var SurveysIndex = require('./components/SurveysIndex.jsx');
var QuestionIndexItem = require('./components/QuestionIndexItem.jsx');
var QuestionEditForm = require('./components/QuestionEditForm.jsx');
var UserEditForm = require('./components/UserEditForm.jsx');
var UserEmailPasswordEditForm = require('./components/UserEmailPasswordEditForm.jsx');
var ForgotPasswordSuccess = require('./components/ForgotPasswordSuccess.jsx');
// var NewFeatures = require('./components/NewFeatures.jsx');
var ResponseForm = require('./components/ResponseForm.jsx');
var Construction = require('./components/Construction.jsx');

var SessionStore = require('./stores/session_store.js');
var SessionApiUtil = require('./util/session_api_util.js');

var Router = (
  <Router history={ hashHistory }>
    <Route path="/login" component={ LoginForm } onEnter={ _ensureLoggedOut } />
    <Route path="/password_resets" component={ ForgotPasswordSuccess } onEnter={ _ensureLoggedOut }/>

    <Route path="/" component={ App } >
      <Route path="signup" component={ SignupPage } onEnter={ _ensureLoggedOut } />
      <Route path="surveys" component={ SurveysIndex } onEnter={ _ensureLoggedIn }/>
      <Route path="questions/:questionId" component={ QuestionIndexItem } onEnter={ _ensureQuestionOwner }/>
      <Route path="questions/:questionId/edit" component={ QuestionEditForm } onEnter={ _ensureQuestionOwner }/>
      <Route path="profile/edit" component={ UserEditForm } onEnter={ _ensureLoggedIn }/>
      <Route path="profile/edit_password_or_email" component={ UserEmailPasswordEditForm } onEnter={ _ensureLoggedIn }/>
      <Route path="construction" component={ Construction } onEnter={ _ensureLoggedIn }/>
    </Route>

    <Route path="/:username" component={ ResponseForm } />
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

function _ensureQuestionOwner(nextState, replace, asyncDoneCallback) {
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
