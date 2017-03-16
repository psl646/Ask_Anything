var React = require('react');
var Link = require('react-router').Link;

var Modal = require('react-modal');
var ModalConstants = require('../constants/modal_constants');
var SessionStore = require('./../stores/session_store');
var SessionApiUtil = require('./../util/session_api_util');
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
      if (window.location.hash.slice(2, 9).toUpperCase() === "SURVEYS"){
        this.setState({ modalOpen: true });
      }
    }.bind(this), 1000);
  },

  greeting: function(){
    var username = SessionStore.currentUser().username.toUpperCase();
    return (
      <li className="li-float-loggedin li-float-right user-info-container blue-hover hover-pointer">
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

  leftLinks: function () {
    var randomLeftLinks = (
      <div className="empty-link">
        <Link to="participants" className="li-float-loggedin left-navbar-padding blue-hover"> Participants </Link>
        <Link to="reports" className="li-float-loggedin left-navbar-padding blue-hover"> Reports </Link>
      </div>
    );
    return "";
  },

  render: function () {
    return (
      <div className="navbar-container">
        <ul className="navbar-left-ul">
          <li className="li-float-loggedin left-navbar-padding create-question hover-pointer" onClick={ this.openModal }>
            +
            <Modal
              isOpen={this.state.modalOpen}
              onRequestClose={this.closeModal}
              style={ ModalConstants.QUESTION_FORM }>

                <QuestionFormGenerator closeThisModal={ this.closeModal } />

            </Modal>
          </li>

          <li className="li-float-loggedin left-navbar-padding my-surveys hover-pointer" onClick={ this.handleQuestionsClick }>
            Questions
          </li>

          { this.leftLinks() }
        </ul>

        <img className="logo-image user-navbar-logo hover-pointer" onClick={ this.handleImageClick } src={window.askAnythingAssets.logo} width="35" height="35" alt="Logo" />

        <ul className="navbar-right-ul">
          { this.greeting() }
          <Link to="user_guide" className="li-float-loggedin li-float-right blue-hover empty-link"> Help </Link>
          <Link to="plans_pricing" className="li-float-loggedin li-float-right blue-hover empty-link"> Pricing & Upgrades </Link>
        </ul>
      </div>
    )
  }
});

module.exports = UserNavBar;
