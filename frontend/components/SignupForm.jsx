var React = require('react');
var Link = require('react-router').Link;
var SessionApiUtil = require('./../util/session_api_util');
var SessionStore = require('./../stores/session_store');
var ErrorStore = require('./../stores/error_store');
var UserApiUtil = require('./../util/user_api_util');

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

	handleSubmit: function (e) {
		e.preventDefault();

		var formData = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
			email: this.state.email,
			password: this.state.password
		};

    UserApiUtil.signup(formData);
	},


  //FOLLOW FORMTYPE IN BENCHBNB FOR FORMERRORS
  fieldErrors: function (field) {
    var errors = ErrorStore.formErrors(this.formType());
    if (!errors[field]) { return; }

    var messages = errors[field].map(function (errorMsg, i) {
      return <li key={ i }>{ errorMsg }</li>;
    });

    return <ul>{ messages }</ul>;
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

	render: function () {
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

    return (
      <div className='signup-form-container'>
        <form onSubmit={this.handleSubmit}>
          { topText }

          <br />
          <label> First name <br/>
            { this.fieldErrors('first_name') }
            <input className='soft-edges' type='text' value={this.state.first_name} onChange={this.firstNameChange}/>
          </label>

          <br />
          <label> Last name <br/>
            { this.fieldErrors('last_name') }
            <input className='soft-edges' type='text' value={this.state.last_name} onChange={this.lastNameChange}/>
          </label>

          <br />
          <label> Email <br/>
            { this.fieldErrors('email') }
            <input className='soft-edges' type='text' value={this.state.email} onChange={this.emailChange}/>
          </label>

          <br />
          <label> Password <br/>
            { this.fieldErrors('password') }
            <input className='soft-edges' type='password' value={this.state.password} onChange={this.passwordChange} />
          </label>

          { bottomText }

          <input
            className='signup-button'
            type='submit'
            value='Create my Ask Anything! account'
            />
        </form>
      </div>
		);
	}
});

module.exports = SignupForm;
