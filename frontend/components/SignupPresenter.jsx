var React = require('react');
var Link = require('react-router').Link;


var SignupPresenter = React.createClass({
	render: function () {
    return (
			<li className='signup-options'>
				<img className='signup-images' src={window.askAnythingAssets.presenter} width="90" height="90" alt="Presenter" />
				<div className="large-text">You're presenting</div>
				<div className='small-text'>Select this if you'll mostly create questions for others to respond to.</div>
			</li>
		)
  }
});

module.exports = SignupPresenter;
