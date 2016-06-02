var React = require('react');
var Link = require('react-router').Link;
var SessionStore = require('./../stores/session_store');
var SessionApiUtil = require('./../util/session_api_util');
var Footer = require('./Footer');
var NavBar = require('./NavBar');

var App = React.createClass({
  componentDidMount: function () {
    this.sessionListener = SessionStore.addListener(this.forceUpdate.bind(this));
    SessionApiUtil.fetchCurrentUser();
  },

  componentWillUnmount: function () {
    this.sessionListener.remove();
  },

  render: function() {
    return (
      <div className="app">
        <NavBar />
        {this.props.children}
        <Footer />
      </div>
    );
  }
});

module.exports = App;
