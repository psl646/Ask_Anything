var React = require('react');
var SessionStore = require('./../stores/session_store');
var SessionApiUtil = require('./../util/session_api_util');
var UserNavBar = require('./UserNavBar');
var NoUserNavBar = require('./NoUserNavBar');
var RootPageContent = require('./RootPageContent');

var App = React.createClass({
  componentDidMount: function () {
    this.sessionListener = SessionStore.addListener(this.forceUpdate.bind(this));
    SessionApiUtil.fetchCurrentUser();
  },

  componentWillUnmount: function () {
    this.sessionListener.remove();
  },

  isRootPage: function () {
    return (window.location.hash.slice(0, 4).toUpperCase() === "#/?_");
  },

  render: function() {
    var navigationBar = <NoUserNavBar />;
    var rootPageContent = "";

    if (SessionStore.isUserLoggedIn()) {
      navigationBar = <UserNavBar />;
    }

    if (this.isRootPage()) {
      rootPageContent = <RootPageContent />
    }

    return (
      <div className="app">
        { navigationBar }
        { rootPageContent }
        {this.props.children}
      </div>
    );
  }
});

module.exports = App;
