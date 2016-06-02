var React = require('react');
var Link = require('react-router').Link;

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

        <ul className="navbar-right-ul">
          <li className="nouser-navbar-right-li">
            <Link to="login">Log in</Link>
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
