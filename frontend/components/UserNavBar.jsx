var React = require('react');
var Modal = require('react-modal');
var ModalConstants = require('../constants/modal_constants');
var SessionStore = require('./../stores/session_store');
var SessionApiUtil = require('./../util/session_api_util');
var Logo = require('./Logo');
var QuestionFormGenerator = require('./QuestionFormGenerator');

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
    if (window.location.hash.slice(2, 9).toUpperCase() !== "SURVEYS") {
      this.context.router.push("surveys");
    }

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
          <li onClick={ this.handleSettingsClicked}>
            Settings
          </li>

          <li onClick={ this.handleLogOut } >
            <input className="hover-pointer" type="submit" value="Log Out" />
          </li>
        </ul>

      </li>
    );
  },

  handleLogOut: function () {
    SessionApiUtil.logout();
    this.context.router.push("/");
  },

  handleImageClick: function () {
    this.context.router.push("/");
  },

  handleSettingsClicked: function () {
    this.context.router.push("settings");
  },

  handleQuestionsClick: function () {
    this.context.router.push("surveys");
  },


  render: function () {
    return (
      <div className="navbar-container">
        <ul className="navbar-left-ul hover-pointer">
          <li className="li-float-loggedin left-navbar-padding create-question" onClick={ this.openModal }>
            +
            <Modal
              isOpen={this.state.modalOpen}
              onRequestClose={this.closeModal}
              style={ ModalConstants.QUESTIONFORM }>

                <QuestionFormGenerator />

            </Modal>
          </li>

          <li className="li-float-loggedin left-navbar-padding my-surveys" onClick={ this.handleQuestionsClick }>
            Questions
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
