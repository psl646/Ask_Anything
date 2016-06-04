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
    return({ id: user.id, first_name: user.first_name, last_name: user.last_name, });
  },

  componentDidMount: function () {
    this.sessionListener = SessionStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.sessionListener.remove();
  },

  _onChange: function () {
    var user = SessionStore.currentUser();
    this.setState({ id: user.id, first_name: user.first_name, last_name: user.last_name });
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

    UserApiUtil.updateUserName(formData);
	},

	render: function () {
    return (
      <div className="user-edit-container">
        <div className="h7">
          User Settings
        </div>
        <form className="user-edit-form" onSubmit={this.handleSubmit}>
          <br />
          <label className="hover-pointer label"> First name <br/>
            <input className={"signup-input soft-edges "} type="text" value={this.state.first_name} onChange={this.firstNameChange}/>
          </label>

          <br />
          <label className="hover-pointer label"> Last name <br/>
            <input className={"signup-input soft-edges "} type="text" value={this.state.last_name} onChange={this.lastNameChange}/>
          </label>

          <br />

          <input
            className="soft-edges hover-pointer"
            type="submit"
            value="Update profile"
            />

          &nbsp; or &nbsp;
          <Link to="surveys">cancel</Link>
        </form>
      </div>
		);
	}
});

module.exports = UserEditForm;
