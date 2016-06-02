var React = require('react');
var SessionStore = require('./../stores/session_store');
var SessionApiUtil = require('./../util/session_api_util');
var Logo = require('./Logo');

var UserNavBar = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  greeting: function(){
    if (SessionStore.isUserLoggedIn()) {
      return (
        <ul className="user-info-container">
          { SessionStore.currentUser().email }
          <li className="user-info">
            <input className="logout-button hover-pointer" type="submit" value="Log Out" onClick={ this.handleClick } />
          </li>
        </ul>
      );
    }
  },

  handleClick: function () {
    SessionApiUtil.logout();
    this.context.router.push("login");
  },

  render: function () {
    return (
      <div className="navbar-container">
        UserNavBar here
        <img className="logo-image navbar-logo" src={window.askAnythingAssets.logo} width="35" height="35" alt="Logo" />

        <ul className="navbar-right-ul hover-pointer">
          <li className="navbar-right-li"> Pricing & Upgrades </li>
          <li className="navbar-right-li"> Help </li>
          <li className="navbar-right-li">  New Features </li>
          <li className="navbar-right-li user-info-container">
            { this.greeting() }
          </li>
        </ul>
      </div>
    )
  }
});

module.exports = UserNavBar;
