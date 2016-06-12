var React = require('react');
var Link = require('react-router').Link;
var ErrorStore = require('./../stores/error_store');
var UserApiUtil = require('./../util/user_api_util');
var ErrorActions = require('../actions/error_actions')

var SignupForm = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return ({ first_name: "", last_name: "", email: "", password: "", errors: false });
  },

  componentDidMount: function () {
    this.errorListener = ErrorStore.addListener(this.handleErrors);
  },

  componentWillUnmount: function () {
    this.errorListener.remove();
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
			email: this.state.email.toLowerCase(),
			password: this.state.password
		};

    UserApiUtil.signup(formData);
    this.setState({ errors: false })
	},

  handleErrors: function () {
    this.setState({ errors: true });
  },

  errorMessages: function () {
    var errors = ErrorStore.getErrors();

    var messages = errors.map(function (errorMsg, i) {
      return <li key={ i } className="error-message">{ errorMsg }</li>;
    });

    return messages;
  },

	render: function () {
    var topText;
    var bottomText;

    if (this.props.type === 'participant') {
      topText = <div className="h4">Participant sign up</div>;
        bottomText = "";
      } else {
        topText = (
          <div>
            <div className="h2">Free plan sign up</div>
            <div className="h3">This is your last stop before youre creating questions.</div>
          </div>
        );
        bottomText = (
          <div>
            <div className="label">What country will people be texting us from?</div>
            <div className="hover-pointer h5"><input className="radio" type="radio" checked readOnly/>United States</div>
            <Link to="moreCountries" className="link h5">» Show more countries...</Link>
          </div>
        );
      }

    var errorText = "";
    var allErrorMessages = "";
    var renderErrors = "";

    if (this.state.errors) {
      errorText = (
        <div>
          <div className="error-large">Oops! We couldn't create your account.</div>
          <div className="error-small">There were problems with the following fields:</div>
        </div>
      );
      allErrorMessages = this.errorMessages();
      renderErrors = (
        <ul className="error-signup">
          <div>{ errorText }</div>
          <div>{ allErrorMessages }</div>
        </ul>
      );
    }

    return (
      <div className="signup-form-container">

        <form onSubmit={this.handleSubmit}>
          { topText }

          { renderErrors }

          <br />
          <label className="hover-pointer label"> First name <br/>
            <input className={"signup-input soft-edges "} type="text" value={this.state.first_name} onChange={this.firstNameChange}/>
          </label>

          <br />
          <label className="hover-pointer label"> Last name <br/>
            <input className={"signup-input soft-edges "} type="text" value={this.state.last_name} onChange={this.lastNameChange}/>
          </label>

          <br />
          <label className="hover-pointer label"> Email <br/>
            <input className={"signup-input soft-edges "} type="text" value={this.state.email} onChange={this.emailChange}/>
          </label>

          <br />
          <label className="hover-pointer label"> Password <br/>
            <input className={"signup-input soft-edges "} type="password" value={this.state.password} onChange={this.passwordChange} />
          </label>

          { bottomText }

          <br />

          <input
            className="signup-button soft-edges hover-pointer"
            type="submit"
            value="Create my Ask Anything! account"
            />
        </form>

        <div className="agreement">By proceeding you agree to Ask Anything!</div>
        <div className="agreement"><Link to="tos" className="link">Terms of Service</Link> and <Link to="privacyPolicy" className="link">Privacy Policy</Link>.</div>
      </div>
		);
	}
});

module.exports = SignupForm;
