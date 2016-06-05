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
    window.setTimeout(function () {
      this.setState({ modalOpen: true });
    }.bind(this), 1000);
  },

  greeting: function(){
    var username = SessionStore.currentUser().username.toUpperCase();
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
    this.context.router.push("profile/edit");
  },

  handleQuestionsClick: function () {
    this.context.router.push("surveys");
  },

  handleFeaturesClick: function () {
    this.context.router.push("new_features");
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
              style={ ModalConstants.QUESTION_FORM }>

                <QuestionFormGenerator closeThisModal={ this.closeModal } />

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
          <li className="li-float-loggedin blue-hover" onClick={ this.handleFeaturesClick }>  New Features </li>
          { this.greeting() }
        </ul>
      </div>
    )
  }
});

module.exports = UserNavBar;
