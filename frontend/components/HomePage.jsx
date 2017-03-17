var React = require('react');
// stores
var SessionStore = require('../stores/session_store');
// util
var UserApiUtil = require('../util/user_api_util');
var SessionApiUtil = require('../util/session_api_util');

var HomePage = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return ({ });
  },

  componentDidMount: function () {
    this.sessionListener = SessionStore.addListener(this.redirectIfLoggedIn);
  },

  componentWillUnmount: function () {
    this.sessionListener.remove();
  },

  redirectIfLoggedIn: function () {
    if (SessionStore.isUserLoggedIn()) {
      this.context.router.push("surveys");
    }
  },

  handleCreateFirstQuestionClick: function () {
    if (SessionStore.isUserLoggedIn()) {
      this.context.router.push("surveys");
    } else {
      var formData = {
        username: "user123",
        email: "user123",
        password: "user123"
      };
      SessionApiUtil.login(formData);
    }
  },

  demoPageLinks: function () {
    if (SessionStore.isUserLoggedIn()) {
      return;
    } else {
      return (
        <ul className="main-page-login-options group">
          <li className="hover-pointer soft-edges create-question-button"
            onClick={ this.handleCreateFirstQuestionClick }>
            Log in as a guest
          </li>
          <li>
            <a href="auth/twitter" className="soft-edges hover-pointer twitter-login">Twitter Login</a>
          </li>
        </ul>
      );
    }
  },

  demoPageContent: function () {
    return (
      <div className="forefront-content group">
        <div className="header-size">Live Audience Participation</div>
        <div className="demo-description">
          Ask Anything! lets you engage your audience or class in real time
        </div>
        { this.demoPageLinks() }
      </div>
    );
  },

  demoGraph: function () {
    return (
      <div className="demo-page-graph">

      </div>
    );
  },

  render: function() {
    return (
      <div className="demo-container group">
        <img className="democontentgif" src={window.askAnythingAssets.background} alt="Backdrop" />
        { this.demoPageContent() }
      </div>
    );
  }
});

module.exports = HomePage;
