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

  leftLinks: function () {
    var leftNavLinks = (
      <ul className="nouser-navbar-left-ul group">
        <Link to="plans_pricing" className="nouser-navbar-left-links hover-nouser-nav"> Plans & Pricing </Link>
        <Link to="tour" className="nouser-navbar-left-links hover-nouser-nav"> Take a tour </Link>
        <Link to="faq" className="nouser-navbar-left-links hover-nouser-nav"> Help & FAQ </Link>
      </ul>
    );
    // Once those Links are set up, return leftNavLinks;
    return "";
  },

  rightLinks: function () {
    return (
      <ul className="nouser-navbar-right-ul group">
        <li className="login-main hover-nouser-nav" onClick={ this.handleLoginClick } >
          Log in
        </li>
        <li className="signup-main hover-nouser-nav soft-edges hover-pointer" onClick={ this.handleSignupClick }>
          Sign up
        </li>
      </ul>
    );
  },

  render: function () {
    return (
      <div className="nouser-nav-main-container">
        <div className="nouser-navbar group">
          <Logo />
          { this.leftLinks() }
          { this.rightLinks() }
        </div>
      </div>
    )
  }
});

module.exports = NoUserNavBar;
