var React = require('react');
var Link = require('react-router').Link;
var SessionApiUtil = require('./../util/session_api_util');
var SessionStore = require('./../stores/session_store');
var ErrorStore = require('./../stores/error_store');
var UserApiUtil = require('./../util/user_api_util');
var ErrorActions = require('../actions/error_actions')

var SignupForm = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return ({ first_name: "", last_name: "", email: "", password: "" });
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

  firstNameChange: function (e) {
    var newFirstName = e.target.value;
    this.setState({ first_name: newFirstName })
  },

  lastNameChange: function (e) {
    var newLastName = e.target.value;
    this.setState({ last_name: newLastName })
  },

  emailChange: function (e) {
    var newEmail = e.target.value;
    this.setState({ email: newEmail })
  },

  passwordChange: function (e) {
    var newPassword = e.target.value;
    this.setState({ password: newPassword })
  },

	handleSubmit: function (e) {
		e.preventDefault();
    ErrorActions.clearErrors();

		var formData = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
			email: this.state.email,
			password: this.state.password
		};

    UserApiUtil.signup(formData);

	},

  fieldErrors: function (field) {
    var errors = ErrorStore.formErrors("signup");
    if (!errors[field]) { return; }
    var messages = errors[field].map(function (errorMsg, i) {
      return <li key={ i }>{ errorMsg }</li>;
    });

    return <ul className="error-message">{ messages }</ul>;
  },

  errorMessages: function () {
    return Object.keys(this.state).map(function(field){
      return this.fieldErrors(field);
    }.bind(this));
  },

  checkForErrors: function () {
    var status = false;
    var errorMessages = this.errorMessages();

    errorMessages.forEach(function(error){
      if (error instanceof Object) {
        status = true;
      };
    });

    return status;
  },

	render: function () {
    var errorText = "";
    var allErrorMessages = "";
    var renderErrors = "";
    var topText;
    var bottomText;

    if (this.props.type === 'participant') {
       topText = <div>Participant sign up</div>;
       bottomText = "";
    } else {
      topText = (
        <div>
          <div>Free plan sign up</div>
          <div>This is your last stop before youre creating polls.</div>
        </div>
      );
      bottomText = (
        <div>
          <div>What country will people be texting us from?</div>
          <div>United States</div>
          <div>» Show more countries..</div>
        </div>
      );
    }


    if (this.checkForErrors()) {
      errorText = (
        <div>
          <div className="error-large">Oops! We couldn't create your account.</div>
          <div className="error-small">There were problems with the following fields:</div>
        </div>
      );
      allErrorMessages = this.errorMessages();
      renderErrors = (
        <ul className="error-signup">
          { errorText }
          { allErrorMessages }
        </ul>
      );
    }

    return (
      <div className="signup-form-container">
        { renderErrors }

        <form onSubmit={this.handleSubmit}>
          { topText }

          <br />
          <label> First name <br/>
            <input className="signup-input soft-edges" type="text" value={this.state.first_name} onChange={this.firstNameChange}/>
          </label>

          <br />
          <label> Last name <br/>
            <input className="signup-input soft-edges" type="text" value={this.state.last_name} onChange={this.lastNameChange}/>
          </label>

          <br />
          <label> Email <br/>
            <input className="signup-input soft-edges" type="text" value={this.state.email} onChange={this.emailChange}/>
          </label>

          <br />
          <label> Password <br/>
            <input className="signup-input soft-edges" type="password" value={this.state.password} onChange={this.passwordChange} />
          </label>

          { bottomText }

          <br />

          <input
            className="signup-button"
            type="submit"
            value="Create my Ask Anything! account"
            />
        </form>
      </div>
		);
	}
});

module.exports = SignupForm;
