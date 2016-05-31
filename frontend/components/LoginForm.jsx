var React = require('react');
var Link = require('react-router').Link;
var SessionApiUtil = require('./../util/session_api_util');
var SessionStore = require('./../stores/session_store');
var ErrorStore = require('./../stores/error_store');
var UserApiUtil = require('./../util/user_api_util');
var Logo = require('./Logo.jsx');

var LoginForm = React.createClass({
  getInitialState: function () {
    return {
      email: "",
      password: ""
    };
  },

  contextTypes: {
    router: React.PropTypes.object.isRequired
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
      this.context.router.push("/");
    }
  },

	handleSubmit: function (e) {
		e.preventDefault();

		var formData = {
			email: this.state.email,
			password: this.state.password
		};

    if (this.props.location.pathname === "/login") {
      SessionApiUtil.login(formData);
    } else {
      UserApiUtil.signup(formData);
    }
	},

  fieldErrors: function (field) {
    var errors = ErrorStore.formErrors(this.formType());
    if (!errors[field]) { return; }

    var messages = errors[field].map(function (errorMsg, i) {
      return <li key={ i }>{ errorMsg }</li>;
    });

    return <ul className='error-login'>{ messages }</ul>;
  },

  formType: function () {
    return this.props.location.pathname.slice(1);
  },

	emailChange: function (e) {
		var newEmail = e.target.value;
		this.setState({ email: newEmail })
	},

	passwordChange: function (e) {
		var newPassword = e.target.value;
		this.setState({ password: newPassword })
	},

	render: function () {
    var newSignUpString = "Do you need an account? Create one in a few seconds."

		return (
			<div className='login-container'>
				<Logo />
				<form className='login-component soft-edges' onSubmit={this.handleSubmit}>
					{ this.fieldErrors('base') }

	        <h1 className='login-head'>Log In</h1>

	        <br />
					<label> Email <small className='login-email'>or username</small><br/>
	          { this.fieldErrors('email') }
						<input className='login-input soft-edges' type='text' value={this.state.email} onChange={this.emailChange}/>
					</label>

	        <br />
					<label> Password <small className='lost-password'><Link to='forgotPassword'>I forgot my password</Link></small><br/>
	          { this.fieldErrors('password') }
						<input className='login-input soft-edges' type='password' value={this.state.password} onChange={this.passwordChange} />
					</label>

	        <br />
					<input className='signin-button soft-edges' type='submit' value='Sign in with my Ask Anything! account' />
          <Link to='signup' className='signup-link'>{newSignUpString}</Link>
				</form>
			</div>
		);
	}
});

module.exports = LoginForm;
