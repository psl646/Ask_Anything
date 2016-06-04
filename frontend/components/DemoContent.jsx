var React = require('react');
var Link = require('react-router').Link;
var GuestUserConstants = require('../constants/guest_user_constants');
var UserApiUtil = require('../util/user_api_util');
var SessionStore = require('../stores/session_store');

var DemoContent = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return ({ letters: GuestUserConstants.letters, numbers: GuestUserConstants.numbers });
  },

  componentDidMount: function () {
    this.sessionListener = SessionStore.addListener(this.redirectIfLoggedIn);
  },

  componentWillUnmount: function () {
    this.sessionListener.remove();
  },

  redirectIfLoggedIn: function () {
    if (SessionStore.isUserLoggedIn()) {
      this.context.router.push("surveys");
    }
  },

  generateRandomEmail: function () {
    var first_name = this.generateRandomLetters(5);
    var last_name = this.generateRandomLetters(3);
    var numbers = this.generateRandomNumbers(6);
    var email = first_name + last_name + numbers + "@askAnything.com"
    return email;
  },

  generateRandomLetters: function (number) {
    var letters = "";

    for (var i = 0; i < number; i++) {
      letters = letters.concat(this.state.letters[Math.floor(Math.random() * this.state.letters.length)]);
    }

    return letters;
  },

  generateRandomNumbers: function (number) {
    var numbers = "";

    for (var i = 0; i < number; i++) {
      numbers = numbers.concat(this.state.numbers[Math.floor(Math.random() * this.state.numbers.length)]);
    }

    return numbers;
  },

  handleCreateFirstPollClick: function () {
    if (SessionStore.isUserLoggedIn()) {
      this.context.router.push("surveys");
    } else {
      // Could input the first_name AND last_name as the randomly generated Five/Three Letters to have A LOT more Guest users
      // But I feel that 1000 Guest users is sufficient for testing & GUESTUSE123 is more pleasing to look at as a username
      // And easier to remember if you choose to relog/update your information into a real account
      var formData = {
        first_name: "Guest",
        last_name: "User",
        email: this.generateRandomEmail(),
        password: "password"
      };

      UserApiUtil.signup(formData);
    }
  },

  render: function() {

    return (
      <div className="demo-container">
        <div>
          Live Audience Participation
        </div>
        <div>
          Ask Anything! lets you engage your audience or class in real time
        </div>
        <ul>
          <li className="hover-pointer" onClick={ this.handleCreateFirstPollClick }>
            Create your first poll
          </li>
          <div>
            Takes 30 seconds. No signup required
          </div>
          <li>
            Watch our 2 min video
          </li>
        </ul>
      </div>
    );
  }
});

module.exports = DemoContent;
