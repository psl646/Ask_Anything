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

  guestLogin: function () {
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

  twitterLogin: function(){
    window.location.href = "auth/twitter";
  },

  demoPageLinks: function () {
    if (SessionStore.isUserLoggedIn()) {
      return;
    } else {
      return (
        <ul className="main-page-login-options group">
          <li id="introjs-guestlogin" className="create-question-button soft-edges hover-pointer" onClick={ this.guestLogin }>
            Log in as a guest
          </li>
          <li className="create-question-button twitter-login soft-edges hover-pointer" onClick={ this.twitterLogin }>
            Twitter Login
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
