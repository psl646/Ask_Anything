var React = require('react');
var Link = require('react-router').Link;
var SessionStore = require('./../stores/session_store');
var UserApiUtil = require('./../util/user_api_util');
var ErrorStore = require('./../stores/error_store');

var UserEditForm = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    var user = SessionStore.currentUser();
    return({
      id: user.id,
      first_name: "",
      last_name: "",
      email: user.email,
      username: user.username,
      errors: false
     });
  },

  componentDidMount: function () {
    this.errorListener = ErrorStore.addListener(this.handleErrors);
    this.sessionListener = SessionStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.errorListener.remove();
    this.sessionListener.remove();
  },

  _onChange: function () {
    var user = SessionStore.currentUser();
    this.setState({
      id: user.id,
      first_name: "",
      last_name: "",
      email: user.email,
      username: user.username,
      errors: false
     });
  },

  handleErrors: function () {
    var user = SessionStore.currentUser();
    this.setState({
      id: user.id,
      first_name: "",
      last_name: "",
      email: user.email,
      username: user.username,
      errors: true
    });
  },

  firstNameChange: function (e) {
    var newFirstName = e.target.value;
    this.setState({ first_name: newFirstName })
  },

  lastNameChange: function (e) {
    var newLastName = e.target.value;
    this.setState({ last_name: newLastName })
  },

	handleSubmit: function (e) {
		e.preventDefault();

		var formData = {
      id: this.state.id,
      first_name: this.state.first_name,
      last_name: this.state.last_name
		};
    if (this.state.email === "user123"){
      alert("You cannot edit guest user.");
    } else {
      UserApiUtil.updateUserName(formData);
    }
	},

  errorMessages: function () {
    var errors = ErrorStore.getErrors();

    var messages = errors.map(function (errorMsg, i) {
      return <li key={ i }>{ errorMsg }</li>;
    });

    return <ul>{ messages }</ul>;
  },

	render: function () {
    var errorText;
    var allErrorMessages;
    var renderErrors = "";

    if (this.state.errors) {
      var number = ErrorStore.getErrors().length;
      if (number === 1) {
        errorText = <div className="error-large error-edit-user-large">
          { number + " error prohibited this update presenter from being saved" }
        </div>
      } else {
        errorText = <div className="error-large error-edit-user-large">
          { number + " errors prohibited this update presenter from being saved" }
        </div>
      }


      allErrorMessages = this.errorMessages();
      renderErrors = (
        <ul className="error-edit-email-password soft-edges">
          { errorText }
          <div className="error-edit-user-small">There were problems with the following fields:</div>
          <div>{ allErrorMessages }</div>
        </ul>
      );
    }

    // /* THE &nbsp; are temporary. Will come back to restyle this */
    return (
      <div className="user-edit-container">
        <div className="h7">
          User Settings
        </div>
        <form className="user-edit-form" onSubmit={ this.handleSubmit }>
          <br />
          <label className="label"> Username <br/>
            ask--anything.herokuapp.com/#/
            <input
              className={"signup-input soft-edges "}
              type="text"
              value={ this.state.username }
              readOnly
              />
          </label>

          { renderErrors }

          <br />
          <label className="hover-text label">

            Email  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            { this.state.email } &nbsp; &nbsp; &nbsp; &nbsp;
            <Link to="profile/edit_password_or_email" className="blue-link">Change</Link>
            <br />
          </label>

          <br />
          <label className="hover-text label">
            Password &nbsp;
            <Link to="profile/edit_password_or_email" className="blue-link">Change your password</Link>
            <br />
          </label>

          <br />
          <label className="label">
            First name <div className="red-inline">*</div> <br/>
            <input
              className={"signup-input soft-edges "}
              type="text"
              value={ this.state.first_name }
              onChange={ this.firstNameChange }
              />
          </label>

          <br />
          <label className="label">
            Last name <div className="red-inline">*</div> <br/>
            <input
              className={"signup-input soft-edges "}
              type="text"
              value={ this.state.last_name }
              onChange={ this.lastNameChange }
              />
          </label>

          <br />

          <input
            className="edit-button soft-edges hover-pointer"
            type="submit"
            value="Update profile"
            />

          &nbsp; or &nbsp;
          <Link to="surveys" className="cancel-edit">cancel</Link>
        </form>
      </div>
		);
	}
});

module.exports = UserEditForm;
