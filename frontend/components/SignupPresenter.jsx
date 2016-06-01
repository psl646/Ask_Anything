var React = require('react');
var Modal = require("react-modal");

var SignupPresenter = React.createClass({
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
				<img className='signup-images' src={window.askAnythingAssets.presenter} width='90' height='90' alt='-Presenter-' />
				<div className='large-text'>You're presenting</div>
				<div className='small-text'>Select this if you'll mostly create questions for others to respond to.</div>
			</li>
		)
  }
});

module.exports = SignupPresenter;
