var React = require('react');
var Modal = require('react-modal');
var ModalConstants = require('../constants/modal_constants.js');
var SignupForm = require('./SignupForm.jsx');

var SignupPresenter = React.createClass({
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
			<li className="signup-options" onClick={this.openModal}>
				<img className="signup-images" src={window.askAnythingAssets.presenter} width="90" height="90" alt="-Presenter-" />
				<div className="large-text">You're presenting</div>
				<div className="small-text">Select this if you'll mostly create questions for others to respond to.</div>
				<Modal
					isOpen={this.state.modalOpen}
          onRequestClose={this.closeModal}
					style={ ModalConstants.SIGNUP }>

						<SignupForm type="presenter" />

        </Modal>
			</li>
		)
  }
});

module.exports = SignupPresenter;
