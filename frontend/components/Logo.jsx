var React = require('react');

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

  isPasswordReset: function () {
    return (window.location.hash.slice(2, 17).toUpperCase() === "PASSWORD_RESETS");
  },

  isnoUserNavBar: function () {
    return (
      (window.location.hash.slice(2, 8).toUpperCase() === "SIGNUP") ||
      (window.location.hash.slice(0, 4).toUpperCase() === "#/?_")
    );
  },

  logoPlacement: function () {
    var logoPlacement = "responseform-logo";
    if (this.isLogin()) {
      logoPlacement = "login-logo"
    } else if (this.isPasswordReset()) {
      logoPlacement = "password-reset-logo"
    } else if (this.isnoUserNavBar()){
      logoPlacement = "nouser-navbar-logo"
    }

    return logoPlacement;
  },

  render: function () {
    return (
      <div className={ "logo-width " + this.logoPlacement() }>
        <img className="hover-pointer logo-image"
          src={window.askAnythingAssets.logo}
          width="35" height="35" alt="Logo"
          onClick={ this.handleClick }/>
        <h1 className="hover-pointer logo-text"
          onClick={ this.handleClick }>Ask Anything!</h1>
      </div>
    )
  }
});

module.exports = Logo;
