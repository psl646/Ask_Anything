var React = require('react');
var Link = require('react-router').Link;
var NavBar = require('./NavBar.jsx');
var Footer = require('./Footer.jsx');
var SignupPresenter
var SignupForm = React.createClass({
	render: function () {
    return (
      <div className='signup-form-container'>
        <NavBar />
        <div className='choose'>Choose your primary use</div>
        <ul>
          <SignupPresenter />
          <SignupParticipant />
        </ul>
        <div className='bottom'>Whichever you chose, you'll still be able to access all of Poll Everywhere.</div>
        <Footer />
      </div>
    )
  }
});

module.exports = SignupForm;
