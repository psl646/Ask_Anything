var React = require('react');
var SessionStore = require('./../stores/session_store');
var SessionApiUtil = require('./../util/session_api_util');

var NavBar = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  greeting: function(){
    if (SessionStore.isUserLoggedIn()) {
      return (
        <ul value={SessionStore.currentUser().email}>
          <li className="user-dropdown">
            <input type="submit" value="Log Out" onClick={ this.handleClick } />
          </li>
        </ul>
      );
    }
  },

  handleClick: function () {
    SessionApiUtil.logout();
    this.context.router.push("login")
  },

  render: function () {
    return (
      <div className="navbar-container">
        navbar
        <ul className="navbar-right-ul">
          <li className="navbar-right-li">{ this.greeting() }</li>
        </ul>
      </div>
    )
  }
});

module.exports = NavBar;
