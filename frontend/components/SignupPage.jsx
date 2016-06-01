var React = require('react');
var NavBar = require('./NavBar.jsx');
var Footer = require('./Footer.jsx');
var SignupParticipant = require('./SignupParticipant.jsx')
var SignupPresenter = require('./SignupPresenter.jsx')

var SignupPage = React.createClass({
	render: function () {
    return (
      <div className='signup-page-container group'>
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

module.exports = SignupPage;
