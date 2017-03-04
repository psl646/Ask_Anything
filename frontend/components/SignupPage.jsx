var React = require('react');
var SignupParticipant = require('./SignupParticipant')
var SignupPresenter = require('./SignupPresenter')
var SessionStore = require('./../stores/session_store');


var SignupPage = React.createClass({
	contextTypes: {
		router: React.PropTypes.object.isRequired
	},

	componentDidMount: function () {
		this.sessionListener = SessionStore.addListener(this.redirectIfLoggedIn);
	},

	componentWillUnmount: function () {
		this.sessionListener.remove();
	},

	redirectIfLoggedIn: function () {
		var that = this;
		if (SessionStore.isUserLoggedIn()) {
			window.setTimeout(
				function(){
					that.context.router.push("surveys");
				}, 0
			);
		}
	},

	render: function () {
    return (
      <div className="signup-page-container group">
        <div className="choose">Choose your primary use</div>
        <ul className="signup-options-container group">
          <SignupParticipant />
          <SignupPresenter />
        </ul>
        <div className="bottom">Whichever you choose, you'll still be able to access all of Ask Anything!</div>
      </div>
    )
  }
});

module.exports = SignupPage;
