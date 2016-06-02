var React = require('react');
var Link = require('react-router').Link;
var SessionStore = require('./../stores/session_store');
var SessionApiUtil = require('./../util/session_api_util');
var Footer = require('./Footer');
var UserNavBar = require('./UserNavBar');
var NoUserNavBar = require('./NoUserNavBar');

var App = React.createClass({
  componentDidMount: function () {
    this.sessionListener = SessionStore.addListener(this.forceUpdate.bind(this));
    SessionApiUtil.fetchCurrentUser();
  },

  componentWillUnmount: function () {
    this.sessionListener.remove();
  },

  render: function() {
    var navigationBar;
    if (SessionStore.isUserLoggedIn()) {
      navigationBar = <UserNavBar />;
    } else {
      navigationBar = <NoUserNavBar />;
    }

    return (
      <div className="app">
        { navigationBar }
        {this.props.children}
        <Footer />
      </div>
    );
  }
});

module.exports = App;
