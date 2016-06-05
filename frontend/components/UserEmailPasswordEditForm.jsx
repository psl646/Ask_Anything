var React = require('react');
var Link = require('react-router').Link;
var SessionApiUtil = require('./../util/session_api_util');
var SessionStore = require('./../stores/session_store');
var UserApiUtil = require('./../util/user_api_util');
var ErrorActions = require('../actions/error_actions')

var UserEditForm = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    var user = SessionStore.currentUser();
    return({ id: user.id, email: user.email, currentPassword: "", password1: "", password2: "" });
  },

  componentDidMount: function () {
    this.sessionListener = SessionStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.sessionListener.remove();
  },

  _onChange: function () {
    var user = SessionStore.currentUser();
    this.setState({ id: user.id, email: user.email, currentPassword: "", password1: "", password2: "" });
  },

  handleCurrentPasswordChange: function (e) {
    var newCurrentPassword = e.target.value;
    this.setState({ currentPassword: newCurrentPassword })
  },

  handlePassword1Change: function (e) {
    var newPassword1 = e.target.value;
    this.setState({ password1: newPassword1 })
  },

  handlePassword2Change: function (e) {
    var newPassword2 = e.target.value;
    this.setState({ password2: newPassword2 })
  },

  handleEmailChange: function (e) {
    var newEmail = e.target.value;
    this.setState({ email: newEmail })
  },

	handleSubmit: function (e) {
		e.preventDefault();

		var formData = {
      id: this.state.id,
      email: this.state.email,
      currentPassword: this.state.currentPassword,
      password1:  this.state.password1,
      password2: this.state.password2
		};

    UserApiUtil.updateEmailPassword(formData);
	},

	render: function () {
    return (
      <div className="user-edit-container">
        <div className="h7">
          Email and Password
        </div>
        <form className="user-edit-form" onSubmit={this.handleSubmit}>
          <br />
          <label className="label"> Email <br/>
            <input className={"signup-input soft-edges "} type="text" value={ this.state.email } onChange={ this.handleEmailChange } />
          </label>

          <br />
          <label className="label"> Current Password * <br/>
            <input className={"signup-input soft-edges "} type="password" value={ this.state.currentPassword } onChange={ this.handleCurrentPasswordChange } />
          </label>

          <br />
          <label className="label"> New Password <br/>
            <input className={"signup-input soft-edges "} type="password" value={ this.state.password1 } onChange={ this.handlePassword1Change } />
          </label>

          <br />
          <label className="label"> Confirm New Password <br/>
            <input className={"signup-input soft-edges "} type="password" value={ this.state.password2 } onChange={ this.handlePassword2Change } />
          </label>

          <br />
          <input
            className="edit-button soft-edges hover-pointer"
            type="submit"
            value="Update profile"
            />

          &nbsp; or &nbsp;
          <Link to="surveys" className="cancel-edit">cancel profile changes</Link>
        </form>
      </div>
		);
	}
});

module.exports = UserEditForm;
