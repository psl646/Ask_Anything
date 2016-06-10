var React = require('react');

var NewFeatures = React.createClass({
  render: function () {
    return (
      <div className="features-container h7"> Here is a list of completed features
        <ul>
          <li className="features-li"> User
            <div>
              Signup: two ways to sign up!
            </div>
            <div>
              Login: able to log in with email OR username
            </div>
            <div>
              Forgot password is "functional"; implement action mailers later?
            </div>
            <div>
              Guest user: access this via Main page - Create Questions
            </div>
            <div>
              User info can be changed via Settings in the top navigation bar
            </div>
          </li>

          <li className="features-li"> Session
            <div>
              Proper Authentication is in place
            </div>
          </li>

          <li className="features-li"> Errors
            <div>
              Errors customized to be what is on actual site
            </div>
          </li>

          <li className="features-li"> Question CRUD
            <div>
              Questions are functional! Create as many questions as you want!

            </div>
          </li>

          <li className="features-li"> Links
            <div>
              ALL LINKS are clickable and go somewhere!
            </div>
          </li>

          <li className="features-li"> Responses
            <div>
              Completed!
            </div>
          </li>


        </ul>
      </div>
    );
  }
});

module.exports = NewFeatures;
