var React = require('react');
var Link = require('react-router').Link;
var SessionStore = require('./../stores/session_store');
var SessionApiUtil = require('./../util/session_api_util');
var Footer = require('./Footer');
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
    var navigationBar;
    var rootPageContent;

    if (SessionStore.isUserLoggedIn()) {
      navigationBar = <UserNavBar />;
    } else {
      navigationBar = <NoUserNavBar />;
    }

    if (this.isRootPage()) {
      rootPageContent = <RootPageContent />
    } else {
      rootPageContent = "";
    }

    console.log(this.isRootPage());
    return (
      <div className="app">
        { navigationBar }
        { rootPageContent }
        {this.props.children}
        <Footer />
      </div>
    );
  }
});

module.exports = App;
