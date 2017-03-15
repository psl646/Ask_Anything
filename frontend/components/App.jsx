var React = require('react');
// components
var HomePage = require('./HomePage');
var NoUserNavBar = require('./NoUserNavBar');
var UserNavBar = require('./UserNavBar');
// stores
var SessionStore = require('./../stores/session_store');
// util
var SessionApiUtil = require('./../util/session_api_util');

var App = React.createClass({
  componentDidMount: function () {
    this.sessionListener = SessionStore.addListener(this.forceUpdate.bind(this));
    SessionApiUtil.fetchCurrentUser();
  },

  componentWillUnmount: function () {
    this.sessionListener.remove();
  },

  isHomePage: function () {
    return (window.location.hash.slice(0, 4).toUpperCase() === "#/?_");
  },

  render: function() {
    var navigationBar = <NoUserNavBar />;
    var homePage = "";

    if (SessionStore.isUserLoggedIn()) {
      navigationBar = <UserNavBar />;
    }

    if (this.isHomePage()) {
      homePage = <HomePage />
    }

    return (
      <div className="app">
        { navigationBar }
        { homePage }
        {this.props.children}
      </div>
    );
  }
});

module.exports = App;
