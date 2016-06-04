var React = require('react');
var Link = require('react-router').Link;
var SessionApiUtil = require('./../util/session_api_util');
var SessionStore = require('./../stores/session_store');
var ErrorStore = require('./../stores/error_store');
var Logo = require('./Logo');

var LoginForm = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return { emailOrUsername: "", password: "" };
  },

  componentDidMount: function () {
    this.errorListener = ErrorStore.addListener(this.forceUpdate.bind(this));
    this.sessionListener = SessionStore.addListener(this.redirectIfLoggedIn);
  },

  componentWillUnmount: function () {
    this.errorListener.remove();
    this.sessionListener.remove();
  },

  redirectIfLoggedIn: function () {
    if (SessionStore.isUserLoggedIn()) {
      this.context.router.push("surveys");
    }
  },

	handleSubmit: function (e) {
		e.preventDefault();
    var uniqueEmailOrUsername = (this.state.emailOrUsername).toUpperCase();

		var formData = {
      username: uniqueEmailOrUsername,
			unique_email: uniqueEmailOrUsername,
			password: this.state.password
		};

    this.setState({ emailOrUsername: "", password: "" });
    SessionApiUtil.login(formData);
	},

  fieldErrors: function (field) {
    var errors = ErrorStore.formErrors("login");
    if (!errors[field]) { return; }

    var messages = errors[field].map(function (errorMsg, i) {
      return <li key={ i }>{ errorMsg }</li>;
    });

    return <ul className="error-login">{ messages }</ul>;
  },

	emailOrUsernameChange: function (e) {
		var newemailOrUsername = e.target.value;
		this.setState({ emailOrUsername: newemailOrUsername });
	},

	passwordChange: function (e) {
		var newPassword = e.target.value;
		this.setState({ password: newPassword })
	},

	render: function () {
    var newSignUpString = "Do you need an account? Create one in a few seconds."

		return (
      <div className="app">
  			<div className="login-container">
  				<Logo />
  				<form className="login-component soft-edges" onSubmit={this.handleSubmit}>
  					{ this.fieldErrors("base") }

  	        <h1 className="h1">Log In</h1>

  	        <br />
  					<label> Email <small className="login-email">or username</small><br/>
  	          { this.fieldErrors("email") }
  						<input className="login-input soft-edges" type="text" value={this.state.emailOrUsername} onChange={this.emailOrUsernameChange} />
  					</label>

  	        <br />
  					<label> Password <small className="lost-password"><Link to="forgotPassword">I forgot my password</Link></small><br/>
  	          { this.fieldErrors("password") }
  						<input className="login-input soft-edges" type="password" value={this.state.password} onChange={this.passwordChange} />
  					</label>

  	        <br />
  					<input className="signin-button soft-edges hover-pointer" type="submit" value="Sign in with my Ask Anything! account" />
            <Link to="signup" className="signup-link">{newSignUpString}</Link>
  				</form>
  			</div>
      </div>
		);
	}
});

module.exports = LoginForm;
