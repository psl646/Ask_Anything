var React = require('react');
var Modal = require("react-modal");
var SignupForm = require('./SignupForm.jsx');

var SignupParticipant = React.createClass({
	contextTypes: {
		router: React.PropTypes.object.isRequired
	},

	getInitialState: function(){
		return({ modalOpen: false });
	},

	closeModal: function(){
		this.setState({ modalOpen: false })
	},

	openModal: function(){
		this.setState({ modalOpen: true })
	},

	render: function () {
    return (
			<li className='signup-options' onClick={this.openModal}>
				<img className='signup-images' src={window.askAnythingAssets.participant} width='90' height='90' alt='-Participant-' />
				<div className='large-text'>You're participating</div>
				<div className='small-text'>Select this if you'll mostly respond to other people's questions.</div>
				<Modal
					isOpen={this.state.modalOpen}
          onRequestClose={this.closeModal}>

						<SignupForm type="participant" />

        </Modal>
			</li>
		)
  }
});

module.exports = SignupParticipant;
