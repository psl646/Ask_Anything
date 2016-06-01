var React = require('react');
var Link = require('react-router').Link;
var NavBar = require('./NavBar.jsx');
var Footer = require('./Footer.jsx');
var SignupParticipant = require('./SignupParticipant.jsx')
var SignupPresenter = require('./SignupPresenter.jsx')

var SignupForm = React.createClass({
	render: function () {
    return (
      <div className='signup-form-container group'>
        <NavBar />
        <div className='choose'>Choose your primary use</div>
        <ul className='signup-options-container group'>
          <SignupParticipant />
          <SignupPresenter />
        </ul>
        <div className='bottom'>Whichever you choose, you'll still be able to access all of Ask Anything!</div>
        <Footer />
      </div>
    )
  }
});

module.exports = SignupForm;
