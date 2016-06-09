var React = require('react');
var Link = require('react-router').Link;
var Logo = require('./Logo');
var UserApiUtil = require('../util/user_api_util');
var UserStore = require('../stores/user_store');
var UserActions = require('../actions/user_actions');
var ClientQuestionActions = require('../actions/client_question_actions');
var QuestionStore = require('../stores/question_store');
var SessionStore = require('../stores/session_store');
var SessionApiUtil = require('../util/session_api_util');
var ResponseActions = require('../actions/response_actions');

SessionStore.currentUser
var ResponseForm = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    var potentialUser = UserStore.getUser();
    var user = potentialUser || {};
    return ({ user: user, question: {}, current_user: {} });
  },

  componentWillMount: function () {
    SessionApiUtil.fetchCurrentUser();

    window.setTimeout(function() {
      var current_user = SessionStore.currentUser();
      this.setState({ current_user: current_user });
    }.bind(this), 0);
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
    var location = window.location.hash.slice(0,11);
    ClientQuestionActions.getQuestionById(user.active_question_id, location);
    this.setState({ user: user });
  },

  _questionChange: function () {
    var question = QuestionStore.getQuestionById(this.state.user.active_question_id);
    this.setState({ question: question });
  },

  recordAnswer: function (e) {
    var answerId = parseInt(e.currentTarget.outerHTML.split('"')[1]);

    var formData = {
      answer_id: answerId,
      user_id: this.state.current_user.id
    };

    ResponseActions.recordResponse(formData);
  },

	render: function () {
    var that = this;
    console.log(this.state.question);

    console.log("User who owns the question:");
    console.log(this.state.user);

    console.log("Current User:");
    console.log(this.state.current_user);

    console.log(this.state.current_user["id"] === undefined);

    var answers;

    var user = (
      <div></div>
    );

    var vote = "0";

    if (this.state.question["answers"] !== undefined) {
      var answerArray = this.state.question["answers"];
      answers = answerArray.map(function(answerObject, idx){
        return (
          <li
            id={ answerObject.id }
            key={ idx }
            className="answer-choice-response-form-container group soft-edges hover-pointer"
            onClick={"li", that.recordAnswer }
            >
            <div className="my-vote-container">
              <div className="my-vote soft-edges ">
                { vote }
              </div>
            </div>
            <div className="answer-choice-response-form">
              { answerObject["answer"] }
            </div>
          </li>
        );
      });
    }

    var voteStatus = "You can respond once"

    // this.state.question.responses.users ===  current_user

    // if () {
    //   voteStatus = "Vote recorded";
    // }

    var user = (
      <div className="found-user-active-question-container">
        <div className="found-user-active-question">
          { this.state.question.question }
        </div>

        <div className="vote-status-response-form">
          { voteStatus }
        </div>

        <ul className="answers-list-response-form">
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
