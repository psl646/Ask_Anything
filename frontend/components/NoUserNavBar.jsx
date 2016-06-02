var React = require('react');

var NoUserNavBar = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  handleClick: function () {
    this.context.router.push("login");
  },

  render: function () {
    return (
      <div className="navbar-container">
        <img className="logo-image nouser-navbar-logo" src={window.askAnythingAssets.logo} width="35" height="35" alt="Logo" />

        <ul className="navbar-right-ul hover-pointer">
          <li className="navbar-right-li"> Log in </li>
          <li className="navbar-right-li">  Sign up </li>
        </ul>
      </div>
    )
  }
});

module.exports = NoUserNavBar;
