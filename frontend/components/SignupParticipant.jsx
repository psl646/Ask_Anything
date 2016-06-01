var React = require('react');
var Modal = require("react-modal");

var SignupParticipant = React.createClass({
	contextTypes: {
		router: React.PropTypes.object.isRequired
	},

	handleClick: function (e) {
		var clickedTargetWords = e.currentTarget.innerHTML.split("-");
		console.log(clickedTargetWords.includes("Presenter"));
		this.context.router.push('signupform');
	},

	render: function () {
    return (
			<li className='signup-options' onClick={this.handleClick}>
				<img className='signup-images' src={window.askAnythingAssets.participant} width='90' height='90' alt='-Participant-' />
				<div className='large-text'>You're participating</div>
				<div className='small-text'>Select this if you'll mostly respond to other people's questions.</div>
			</li>
		)
  }
});

module.exports = SignupParticipant;
