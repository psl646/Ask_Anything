var React = require('react');
var Link = require('react-router').Link;

var Logo = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  handleClick: function () {
    this.context.router.push("/");
  },

  isLogin: function () {
    return (window.location.hash.slice(2, 7).toUpperCase() === "LOGIN");
  },

  render: function () {
    var logoPlacement = "nouser-navbar-logo";

    if (this.isLogin()) {
      logoPlacement = "login-logo"
    }

    return (
      <div className={ logoPlacement }>
        <img className="hover-pointer logo-image" src={window.askAnythingAssets.logo} width="35" height="35" alt="Logo" onClick={ this.handleClick }/>
        <h1 className="hover-pointer logo-text" onClick={ this.handleClick }>Ask Anything!</h1>
      </div>
    )
  }
});

module.exports = Logo;
