var React = require('react');
var Link = require('react-router').Link;
var SessionApiUtil = require('./../util/session_api_util');
var SessionStore = require('./../stores/session_store');
var ErrorStore = require('./../stores/error_store');
var Logo = require('./Logo');
var Modal = require('react-modal');
var ModalConstants = require('../constants/modal_constants');
var ForgotPassword = require('./ForgotPassword');

var LoginForm = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return { emailOrUsername: "", password: "", errors: false, modalOpen: false };
  },

  componentDidMount: function () {
    this.errorListener = ErrorStore.addListener(this.handleErrors);
    this.sessionListener = SessionStore.addListener(this.logInUser);
  },

  componentWillUnmount: function () {
    this.errorListener.remove();
    this.sessionListener.remove();
  },

  logInUser: function () {
    if (SessionStore.isUserLoggedIn()) {
      this.context.router.push("surveys");
    }
  },

  closeModal: function(){
    this.setState({ modalOpen: false })
  },

  openModal: function(){
    this.setState({ modalOpen: true })
  },

  handleErrors: function () {
    if (ErrorStore.getErrors().length > 0) {
      this.setState({ errors: true });
    }
  },

	handleSubmit: function (e) {
		e.preventDefault();
    var emailOrUsername = (this.state.emailOrUsername).toLowerCase();

		var formData = {
      username: emailOrUsername,
			email: emailOrUsername,
			password: this.state.password
		};

    SessionApiUtil.login(formData);
    this.setState({ emailOrUsername: "", password: "", errors: false });
	},

  handleGuestLogin: function (e) {
    e.preventDefault();
    var formData = {
      username: "user123",
      email: "user123",
      password: "user123"
    };

    SessionApiUtil.login(formData);
  },

  errorMessages: function () {
    var errors = ErrorStore.getErrors();
    var messages = errors.map(function (errorMsg, i) {
      return <li className="error-login" key={ i }>{ errorMsg }</li>;
    });

    return messages;
  },

	emailOrUsernameChange: function (e) {
		var newemailOrUsername = e.target.value;
		this.setState({ emailOrUsername: newemailOrUsername });
	},

	passwordChange: function (e) {
		var newPassword = e.target.value;
		this.setState({ password: newPassword })
	},

  logo: function () {
    return this.state.modalOpen ? "" : <Logo />;
  },

  renderErrors: function () {
    var allErrorMessages = "";
    var renderErrors = "";

    if (this.state.errors) {
      allErrorMessages = this.errorMessages();
      renderErrors = <div>{ allErrorMessages }</div>;
    }
    return renderErrors;
  },

  emailInputField: function () {
    return (
      <label> Email <small className="login-email">or username</small><br/>
        <input
          className="login-input soft-edges"
          type="text"
          value={ this.state.emailOrUsername }
          onChange={ this.emailOrUsernameChange } />
      </label>
    );
  },

  forgotPasswordModal: function () {
    return (
      <Modal
        isOpen={ this.state.modalOpen }
        onRequestClose={ this.closeModal }
        style={ ModalConstants.FORGOT_PASSWORD }>
        <ForgotPassword closeThisModal={ this.closeModal } />
      </Modal>
    );
  },

  passwordInputField: function () {
    return (
      <label> Password
        <small className="lost-password hover-pointer hover-underline" onClick={ this.openModal }>
          I forgot my password
          { this.forgotPasswordModal() }
        </small><br/>
        <input
          className="login-input soft-edges"
          type="password"
          value={ this.state.password }
          onChange={ this.passwordChange } />
      </label>
    );
  },

  signInButton: function () {
    return (
      <input
        className="signin-button soft-edges hover-pointer"
        type="submit"
        value="Sign in with my Ask Anything! account" />
    );
  },

  img: function () {
    return (
      <img
        className="logo-image logo-login-button hover-pointer"
        src={ window.askAnythingAssets.logo }
        width="15"
        height="15"
        alt="Logo"
        onClick={ this.handleSubmit }
        />
    );
  },

  guestLogin: function () {
    return (
      <div className="guest-login-button soft-edges hover-pointer"
        onClick={ this.handleGuestLogin }>
        Guest Login
      </div>
    );
  },

  signUpNewAccount: function () {
    return (
      <Link to="signup" className="signup-link">
        Do you need an account? Create one in a few seconds.
      </Link>
    );
  },

  formButtons: function () {
    return (
      <div>
        { this.signInButton() }
        { this.img() }
        { this.guestLogin() }
        { this.signUpNewAccount() }
      </div>
    );
  },

	render: function () {
		return (
      <div className="app">
  			<div className="login-container">
          { this.logo() }
          <form className="login-component soft-edges" onSubmit={ this.handleSubmit }>
  					{ this.renderErrors() }
  	        <h1 className="h1">Log In</h1> <br />
            { this.emailInputField() } <br />
  					{ this.passwordInputField() } <br />
            { this.formButtons() }
  				</form>
  			</div>
      </div>
		);
	}
});

module.exports = LoginForm;
