var React = require('react');
var ErrorStore = require('./../stores/error_store');
var ErrorActions = require('../actions/error_actions');
var UserActions = require('../actions/user_actions');
var UserApiUtil = require('../util/user_api_util');
var UserStore = require('../stores/user_store');
var Logo = require('./Logo');

var ForgotPassword = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return { email: "", errors: false, foundUser: false };
  },

  componentDidMount: function () {
    this.errorListener = ErrorStore.addListener(this.handleErrors);
    this.userListener = UserStore.addListener(this.redirectIfValidEmail);
  },

  componentWillUnmount: function () {
    this.errorListener.remove();
    this.userListener.remove();
    ErrorActions.clearErrors();
    UserActions.clearUser();
  },

  redirectIfValidEmail: function () {
    var that = this;
    window.setTimeout(function () {
      that.closeMyself();
    }, 0 )
    window.setTimeout(function () {
      that.context.router.push("/password_resets");
    }, 0);
  },

  closeMyself: function () {
    ErrorActions.clearErrors();
    this.props.closeThisModal();
  },

  handleErrors: function () {
    this.setState({ errors: true });
  },

	handleSubmit: function (e) {
		e.preventDefault();
    var email = (this.state.email).toLowerCase();

		var formData = {
			email: email
		};

    UserApiUtil.findUserByEmail(formData);
    this.setState({ email: "", errors: false });
	},

  errorMessages: function () {
    var errors = ErrorStore.getErrors();
    var messages = errors.map(function (errorMsg, i) {
      return <li key={ i }>{ errorMsg }</li>;
    });

    return <ul className="error-login">{ messages }</ul>;
  },

	emailChange: function (e) {
		var newemail = e.target.value;
		this.setState({ email: newemail });
	},

  handleCancelClick: function () {
    this.closeModal();
  },

	render: function () {
    var renderErrors = "";
    var logo = <Logo />;

    if (this.state.errors) {
      renderErrors = <div>{ this.errorMessages() }</div>;
    };

    if (this.state.foundUser) {
      logo = "";
    }

    return (
      <div className="app">
  			<div className="login-container">

          { logo }

  				<form className="login-component soft-edges" onSubmit={this.handleSubmit}>
            { renderErrors }
  	        <h1 className="h1">Log In</h1>

  	        <br />
  					<label> Email <br />
  						<input
                className="login-input soft-edges"
                type="text"
                value={this.state.email}
                onChange={this.emailChange}
                />
  					</label>

            <br />

            <div className="h11-5">
              It's ok, this happens to the best of us. Make sure
              the email you entered above is correct and we'll
              email you instructions on how to reset your password.
            </div>

  	        <br />
  					<input
              className="signin-button soft-edges hover-pointer"
              type="submit"
              value="Send me password reset instructions"
              />


            <div className="cancel-forgot hover-underline hover-pointer text-center" onClick={ this.closeMyself }>
              Cancel
            </div>
  				</form>
  			</div>
      </div>
		);
	}
});

module.exports = ForgotPassword;
