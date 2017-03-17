var React = require('react');
var Link = require('react-router').Link;
var Logo = require('./Logo');
var SessionApiUtil = require('../util/session_api_util');

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
        <li id="introjs-starttour" className="login-main hover-nouser-nav" onClick={ this.handleTour } data-step="1" data-intro="Welcome to AskAnything! Start by logging in as a guest!">
          Guided Tour
        </li>
        <li className="login-main hover-nouser-nav" onClick={ this.handleLoginClick } >
          Log in
        </li>
        <li className="signup-main hover-nouser-nav soft-edges hover-pointer" onClick={ this.handleSignupClick }>
          Sign up
        </li>
      </ul>
    );
  },

  handleTour: function(e){
    e.preventDefault();
    var intro = introJs();
    intro.setOptions({
      showStepNumbers: false,
      doneLabel: "Continue Tour",
      steps:[
        {
          element: document.getElementById("introjs-starttour"),
          intro: "Welcome to AskAnything! A place where you can ask questions and receive responses!"
        },
        {
          element: document.getElementById("introjs-guestlogin"),
          intro: "We'll begin by logging you into our guest user account. Click 'Continue Tour' below."
        }
      ]
    })
    intro.start().oncomplete(function(){
      var formData = {
        username: "user123",
        email: "user123",
        password: "user123",
        tour: true
      };
      SessionApiUtil.tourlogin(formData);
    });
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
