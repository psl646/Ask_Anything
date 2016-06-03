var React = require('react');
var SessionStore = require('./../stores/session_store');
var SessionApiUtil = require('./../util/session_api_util');
var Logo = require('./Logo');
var Link = require('react-router').Link;
var ModalConstants = require('../constants/modal_constants');

var UserNavBar = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return ({ modalOpen: false });
  },

  closeModal: function(){
    this.setState({ modalOpen: false })
  },

  openModal: function(){
    this.setState({ modalOpen: true })
  },

  greeting: function(){
    var username = SessionStore.currentUser().username;
    return (
      <li className="li-float-loggedin user-info-container blue-hover">
        { username }
        <div className="cog-position">
          <i className="fa fa-cog fa-2x" aria-hidden="true"></i>
        </div>
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

  // This is the image/pseudocontent for the above
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
        <ul className="navbar-left-ul hover-pointer">
          <li className="li-float-loggedin left-navbar-padding create-question"> + </li>
          <li className="li-float-loggedin left-navbar-padding my-surveys">
            <Link to="surveys">Questions</Link>
          </li>
          <li className="li-float-loggedin left-navbar-padding blue-hover"> Participants </li>
          <li className="li-float-loggedin left-navbar-padding blue-hover"> Reports </li>
        </ul>

        <img className="logo-image user-navbar-logo hover-pointer" onClick={ this.handleImageClick } src={window.askAnythingAssets.logo} width="35" height="35" alt="Logo" />

        <ul className="navbar-right-ul hover-pointer">
          <li className="li-float-loggedin blue-hover"> Pricing & Upgrades </li>
          <li className="li-float-loggedin blue-hover"> Help </li>
          <li className="li-float-loggedin blue-hover">  New Features </li>
          { this.greeting() }
        </ul>
      </div>
    )
  }
});

module.exports = UserNavBar;
