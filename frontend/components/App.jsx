var React = require('react');
var Link = require('react-router').Link;
var SessionStore = require('./../stores/session_store');
var SessionApiUtil = require('./../util/session_api_util');

var App = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  componentDidMount: function () {
    SessionStore.addListener(this.forceUpdate.bind(this));
  },

  handleClick: function () {
    SessionApiUtil.logout();
    this.context.router.push("/login")
  },

  greeting: function(){
    if (SessionStore.isUserLoggedIn()) {
    	return (
    		<hgroup>
    			<h2>Hi, {SessionStore.currentUser().email}!</h2>
    			<input type="submit" value="logout" onClick={ this.handleClick } />
    		</hgroup>
    	);
    }
  },

  render: function() {
    return (
      <div className="app">
        { this.greeting() }
        {this.props.children}
      </div>
    );
  }
});

module.exports = App;
