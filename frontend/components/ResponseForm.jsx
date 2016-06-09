var React = require('react');
var Link = require('react-router').Link;
var Logo = require('./Logo');
var UserApiUtil = require('../util/user_api_util');
var UserStore = require('../stores/user_store');
var UserActions = require('../actions/user_actions');
var ClientQuestionActions = require('../actions/client_question_actions');
var QuestionStore = require('../stores/question_store');

var ResponseForm = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    var potentialUser = UserStore.getUser();
    var user = potentialUser || {};
    return ({ user: user, question: {} });
  },

  componentWillMount: function () {
    this.userListener = UserStore.addListener(this._onChange);
    this.questionListener = QuestionStore.addListener(this._questionChange);
    var username = window.location.hash.slice(2).split("?")[0];
    UserApiUtil.findUserByUsername(username);
  },

  componentWillUnmount: function () {
    this.userListener.remove();
    UserActions.clearUser();
  },

  _onChange: function () {
    var user = UserStore.getUser();
    ClientQuestionActions.getQuestionById(user.active_question_id);
    this.setState({ user: user });
  },

  _questionChange: function () {
    var question = QuestionStore.getQuestionById(this.state.user.active_question_id);
    this.setState({ question: question });
  },

	render: function () {
    var answers;

    var user = (
      <div></div>
    );


    if (this.state.question["answers"] !== undefined) {
      var answerArray = this.state.question["answers"];
      console.log(answerArray);
      console.log(answerArray.length);
      answers = answerArray.map(function(answerObject, idx){
        return (
          <li key={ idx }>
            { answerObject["answer"] }
          </li>
        );
      });
    }

    var user = (
      <div className="found-user-active-question">
        <div>
          { this.state.question.question }
        </div>
        <div>
          You can respond once
        </div>
        <ul>
          { answers }
        </ul>
      </div>
    );

    if (this.state.user.active_question_id === null) {
      var user = (
        <div className="user-found-no-active-question-container">
          <img
            className="logo-image"
            src={window.askAnythingAssets.logo}
            width="110" height="110" alt="Logo"
            />
          <div>
            <div className="welcome-response-form-presentation">
              {"Welcome to " + this.state.user.username + "'s presentation" }
            </div>
            <div className="welcome-response-form-text">
              {"As soon as " + this.state.user.username + " displays a poll, we'll update this area to give you the voting options." }
            </div>
            <div className="welcome-response-form-text">
              Easy as pie. Just hang tight, you're ready to go.
            </div>
          </div>
        </div>
      );
    }

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
