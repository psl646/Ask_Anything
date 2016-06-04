var React = require('react');
var Link = require('react-router').Link;
var Logo = require('./Logo');

var NoUserNavBar = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  handleLoginClick: function () {
    this.context.router.push("login");
  },

  handleSignupClick: function () {
    this.context.router.push("signup");
  },

  render: function () {
    return (
      <div className="nouser-nav-main-container">
        <div className="nouser-navbar group">
          <Logo />

          <ul className="nouser-navbar-left-ul group">
            <li className="hover-nouser-nav"> Plans & Pricing </li>
            <li className="hover-nouser-nav"> Take a tour </li>
            <li className="hover-nouser-nav"> Help & FAQ </li>
          </ul>

          <ul className="nouser-navbar-right-ul group">
            <li className="login-main hover-nouser-nav" onClick={ this.handleLoginClick } >
              Log in
            </li>
            <li className="signup-main soft-edges hover-pointer" onClick={ this.handleSignupClick }>
              Sign up
            </li>
          </ul>
        </div>
      </div>
    )
  }
});

module.exports = NoUserNavBar;
