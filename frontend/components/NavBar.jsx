var React = require('react');
var SessionStore = require('./../stores/session_store');
var SessionApiUtil = require('./../util/session_api_util');

var NavBar = React.createClass({
  greeting: function(){
    if (SessionStore.isUserLoggedIn()) {
      return (
        <hgroup>
          <h2>Hi, {SessionStore.currentUser().email}!</h2>
          <input type="submit" value="logout" onClick={ this.handleClick } />
        </hgroup>
      );
    }
  },

  handleClick: function () {
    SessionApiUtil.logout();
    this.context.router.push("/login")
  },

  render: function () {
    return (
      <div className="navbar-container">
        navbar
        { this.greeting() }
      </div>
    )
  }
});

module.exports = NavBar;
