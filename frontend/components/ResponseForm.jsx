var React = require('react');
var Logo = require('./Logo');
var UserApiUtil = require('../util/user_api_util');
var UserStore = require('../stores/user_store');
var UserActions = require('../actions/user_actions');
var ClientQuestionActions = require('../actions/client_question_actions');
var QuestionStore = require('../stores/question_store');
var SessionStore = require('../stores/session_store');
var SessionApiUtil = require('../util/session_api_util');
var ResponseActions = require('../actions/response_actions');
var ErrorActions = require('../actions/error_actions');

var ResponseForm = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    var potentialUser = UserStore.getUser();
    var user = potentialUser || {};
    return ({ user: user, question: {}, current_user: {} });
  },

  componentDidMount: function () {
    this.userListener = UserStore.addListener(this._onChange);
    this.questionListener = QuestionStore.addListener(this._questionChange);
    SessionApiUtil.fetchCurrentUser();
    window.setTimeout(function() {
      var current_user = SessionStore.currentUser();
      this.setState({ current_user: current_user });
    }.bind(this), 0);
    var username = window.location.hash.slice(2).split("?")[0];
    UserApiUtil.findUserByUsername(username.toLowerCase());

    this.pusher = new Pusher('d7b6b378f3d562f7fd37', {
      encrypted: true
    });

    var channel = this.pusher.subscribe('question_updated');
    channel.bind('question_changed', function(data) {
      UserApiUtil.findUserByUsername(username);
    });
  },

  componentWillUnmount: function () {
    this.pusher.unsubscribe('question_updated');
    this.questionListener.remove();
    ErrorActions.clearErrors();
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
    var user = UserStore.getUser();
    var question = QuestionStore.getQuestionById(user.active_question_id);
    this.setState({ question: question, user: user });
  },

  recordAnswer: function (e) {
    var outerHTML = e.currentTarget.outerHTML;
    var answerId = outerHTML.slice(outerHTML.indexOf('id="') + 4).split('"')[0];
    var formData = {
      answer_id: parseInt(answerId),
      user_id: this.state.current_user.id
    };

    ResponseActions.recordResponse(formData);
  },

  deleteResponse: function (e) {
    var responsesArray = this.state.question["responses"];
    var responseId;

    for (var i = 0; i < responsesArray.length; i++) {
      var current_user_id = this.state.current_user.id;
      var current_response_user_id = responsesArray[i]["user_id"];

      if (current_user_id) {
        if (current_user_id === current_response_user_id) {
          responseId = responsesArray[i]["id"];
        }
      } else {
        if (current_response_user_id === null) {
          responseId = responsesArray[i]["id"];
        }
      }
    }

    ResponseActions.deleteResponse(responseId);
  },

  handleMenuClick: function () {
    this.context.router.push("/");
  },

  sortAnswers: function (answerArray) {
    var sortedAnswers = {};
    answerArray.forEach(function(answer){
      sortedAnswers[answer["id"]] = answer["answer"];
    });

    var answerArr = [];
    Object.keys(sortedAnswers).forEach(function(id){
      answerArr.push([id, sortedAnswers[id]]);
    });

    return answerArr;
  },

	render: function () {
    var that = this;

    var answers;

    var user = (
      <div></div>
    );

    var clearResponseButton = "";
    var voteStatus = "You can respond once";
    var answerChoiceResponse = "answer-choice-response-form";
    var myVote = "my-vote";
    var hoverPointer = "non-voted-lis";

    if (this.state.question["answers"] !== undefined) {
      var responsesArray = this.state.question["responses"];
      var current_user_id = this.state.current_user["id"];
      var myAnswerId;

      if (current_user_id){
        for (var i = 0; i < responsesArray.length; i++) {
          if (responsesArray[i]["user_id"] === current_user_id) {
            myAnswerId = parseInt(responsesArray[i]["answer_id"]);
            hoverPointer = "voted-lis";
            voteStatus = "Vote recorded";
            myVote = "my-vote-recorded";
            answerChoiceResponse = "answer-choice-response-form-voted";
            clearResponseButton = (
              <div className="clear-my-response soft-edges hover-pointer" onClick={ that.deleteResponse }>
                Clear Response
              </div>
            );
          }
        }
      } else {
        for (var i = 0; i < responsesArray.length; i++) {
          if (responsesArray[i]["user_id"] === null) {
            myAnswerId = parseInt(responsesArray[i]["answer_id"]);
            hoverPointer = "voted-lis";
            voteStatus = "Vote recorded";
            myVote = "my-vote-recorded";
            answerChoiceResponse = "answer-choice-response-form-voted";
            clearResponseButton = (
              <div className="clear-my-response soft-edges hover-pointer" onClick={ that.deleteResponse }>
                Clear Response
              </div>
            );
          }
        }
      }

      var answerArray = this.sortAnswers(this.state.question["answers"]);
      answers = answerArray.map(function(answerObject, idx){
        var vote = "0";
        if (parseInt(answerObject[0]) === myAnswerId) {
          vote = "1";
        }

        return (
          <li
            id={ answerObject[0] }
            key={ idx }
            className={ "answer-choice-response-form-container group soft-edges " + hoverPointer }
            onClick={"li", that.recordAnswer }
            >

            <div className="my-vote-container">
              <div className={ myVote + " soft-edges " }>
                { vote }
              </div>
            </div>

            <div className={ answerChoiceResponse }>
              { answerObject[1] }
            </div>

          </li>
        );
      });
    }

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
        { clearResponseButton }
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
              {"As soon as " + this.state.user.username + " displays a question, we'll update this area to give you the voting options." }
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
      );
    }

    return (
      <div className="responseform-page">
        <div className="responseform-menu">
          <div className="fa fa-bars menu-bars hover-pointer" aria-hidden="true" onClick={ this.handleMenuClick }></div>
        </div>
        { user }
      </div>
		);
	}
});


module.exports = ResponseForm;
