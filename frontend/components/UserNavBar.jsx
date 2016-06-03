var React = require('react');
var SessionStore = require('./../stores/session_store');
var SessionApiUtil = require('./../util/session_api_util');
var Logo = require('./Logo');
var Link = require('react-router').Link;

var UserNavBar = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  greeting: function(){
    var username = SessionStore.currentUser().username;

    return (
      <li className="navbar-right-li user-info-container blue-hover">{ username }

        <ul className="user-info">
          <li>
            <Link to="settings">Settings</Link>
          </li>

          <li>
            <input className="hover-pointer" type="submit" value="Log Out" onClick={ this.handleLogOut } />
          </li>
        </ul>

      </li>
    );
  },
// <img className="user-icon" src={window.askAnythingAssets.usericon} width="25" height="25" alt="UserIcon" />
  handleLogOut: function () {
    SessionApiUtil.logout();
    this.context.router.push("/");
  },

  handleImageClick: function () {
    this.context.router.push("/");
  },

  render: function () {
    return (
      <div className="navbar-container">
        UserNavBar here
        <img className="logo-image navbar-logo hover-pointer" onClick={ this.handleImageClick } src={window.askAnythingAssets.logo} width="35" height="35" alt="Logo" />

        <ul className="navbar-right-ul hover-pointer">
          <li className="navbar-right-li blue-hover"> Pricing & Upgrades </li>
          <li className="navbar-right-li blue-hover"> Help </li>
          <li className="navbar-right-li blue-hover">  New Features </li>
          { this.greeting() }
        </ul>
      </div>
    )
  }
});

module.exports = UserNavBar;
