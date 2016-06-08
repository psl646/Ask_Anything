var React = require('react');
var Link = require('react-router').Link;
var Logo = require('./Logo');
var UserApiUtil = require('../util/user_api_util');

var ResponseForm = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return ({ user: {} });
  },

  componentWillMount: function () {
    var username = window.location.hash.slice(2).split("?")[0];
    UserApiUtil.findUserByUsername(username);

  },

  componentWillUnmount: function () {

  },

  _onChange: function () {

  },

	render: function () {
    var user = (
      <div>
        this.state.user;
      </div>
    );

    if (Object.keys(this.state.user).length === 0){
      user = (
        <div>
          <Logo />
          <div className="no-user-message-container soft-edges">
            <div className="end-of-internet">
              You've reached the end of the Internet
            </div>
            <div className="h11-5 404-message">
              The page you're looking for can't be found. (404)
            </div>
            <ul className="no-user-message-ul">
              <div className="">
                Try these:
              </div>
              <li>
                Make sure the URL is correct.
              </li>
              <li>
                Has this question or presenter been deleted?
              </li>
            </ul>
          </div>
        </div>
      )
    }

    return (
      <div className="responseform-page">
        <div className="responseform-menu">
          <div className="fa fa-bars menu-bars" aria-hidden="true"></div>
        </div>
        { user }
      </div>
		);
	}
});

module.exports = ResponseForm;
