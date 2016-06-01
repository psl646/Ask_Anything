var React = require('react');
var NavBar = require('./NavBar');
var Footer = require('./Footer');
var SignupParticipant = require('./SignupParticipant')
var SignupPresenter = require('./SignupPresenter')

var SignupPage = React.createClass({
	render: function () {
    return (
      <div className="signup-page-container group">
        <NavBar />
        <div className="choose">Choose your primary use</div>
        <ul className="signup-options-container group">
          <SignupParticipant />
          <SignupPresenter />
        </ul>
        <div className="bottom">Whichever you choose, you'll still be able to access all of Ask Anything!</div>
        <Footer />
      </div>
    )
  }
});

module.exports = SignupPage;
