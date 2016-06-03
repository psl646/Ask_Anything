var React = require('react');
var Link = require('react-router').Link;
var Logo = require('./Logo');

var NoUserNavBar = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  handleClick: function () {
    this.context.router.push("login");
  },

  render: function () {
    return (
      <div className="nouser-nav-main-container group">
        <Logo />

        <ul className="nouser-navbar-left-ul">
          <li className="hover-nouser-nav make-me-red"> Plans & Pricing </li>
          <li className="hover-nouser-nav make-me-red"> Take a tour </li>
          <li className="hover-nouser-nav make-me-red"> Help & FAQ </li>
        </ul>

        <ul className="nouser-navbar-right-ul">
          <li className="hover-nouser-nav make-me-red">
            <Link to="login" className="nouser-nav-link">Log in</Link>
          </li>
          <li>
            <Link to="signup" className="signup-main soft-edges">Sign up</Link>
          </li>
        </ul>
      </div>
    )
  }
});

module.exports = NoUserNavBar;

// </div><img className="logo-image nouser-navbar" src={window.askAnythingAssets.logo} width="35" height="35" alt="Logo" />
