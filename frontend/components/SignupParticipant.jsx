var React = require('react');
var Link = require('react-router').Link;


var SignupParticipant = React.createClass({
	render: function () {
    return (
			<li className='signup-options'>
				<img className='signup-images' src={window.askAnythingAssets.participant} width="90" height="90" alt="Participant" />
				<div className="large-text">You're participating</div>
				<div className='small-text'>Select this if you'll mostly respond to other people's questions.</div>
			</li>
		)
  }
});

module.exports = SignupParticipant;
