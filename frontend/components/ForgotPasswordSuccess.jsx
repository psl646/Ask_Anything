var React = require('react');
var Link = require('react-router').Link;
var Logo = require('./Logo');

var ForgotPasswordSuccess = React.createClass({
	render: function () {
    return (
      <div className="app">
  			<div className="password-reset-container">
          <Logo />
          <div className="password-reset-box text-center soft-edges h14">
            You will receive an email shortly with a link and instructions to reset your password.
            <br />
            <Link to="/" className="home-link hover-pointer deep-blue h11-5">Return to home</Link>
          </div>
  			</div>
      </div>
		);
	}
});

module.exports = ForgotPasswordSuccess;
