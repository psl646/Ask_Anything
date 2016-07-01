var React = require('react');

var NewFeatures = React.createClass({
  user: function () {
    return (
      <li className="features-li"> User
        <div>
          New account: Sign up as a participant or presenter! <br/>
          Login: Login with your email address or username! <br/>
          You can quickly create a guest user account on the landing page. <br/>
          Feel free to log in as our main guest user and poke around! <br/>
          User information can be changed via Settings (hover over cog icon) in the top navigation bar.
        </div>
      </li>
    );
  },

  authentication: function () {
    return (
      <li className="features-li"> Authentication
        <div>
          Secure user authentication via BCrypt.  <br/>
          In addition, leverages Omniauth through the Twitter login for an additional mode of secure login.
        </div>
      </li>
    );
  },

  questions: function () {
    return (
      <li className="features-li"> Questions
        <div>
          Uses a front-end Flux store to store form data.
          Create as many questions as you want at a time!<br/>
          Use the quick question feature!
          Hover over 'ProTip' above the 'Create' button
          on the question form for instructions!<br/>
          Use the timer feature (hover over the Ask Anything Logo on the bottom of the graph)
          on the Question Show page to set a limit on how long a question will stay active.
        </div>
      </li>
    );
  },

  responses: function () {
    return (
      <li className="features-li"> Responses
        <div>
          Register responses in real-time via WebSockets through the Pusher API.
        </div>
      </li>
    );
  },

  render: function () {
    return (
      <div className="features-container h7"> Here is a list of completed features
        <ul>
          { this.user() }
          { this.authentication() }
          { this.questions() }
          { this.responses() }
        </ul>
      </div>
    );
  }
});

module.exports = NewFeatures;
