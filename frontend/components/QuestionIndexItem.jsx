var React = require('react');
var ClientQuestionActions = require('../actions/client_question_actions');
var QuestionStore = require('../stores/question_store')
var QuestionIndexItemToolbar = require('./QuestionIndexItemToolbar');
var TimeConstants = require('../constants/time_constants');
var ClientQuestionActions = require('../actions/client_question_actions');
var ErrorStore = require('./../stores/error_store');
var ErrorActions = require('../actions/error_actions');

var QuestionIndexItem = React.createClass ({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    var questionId = parseInt(window.location.hash.split("?")[0].split("questions")[1].split("/")[1]);
    var myQuestion = QuestionStore.getQuestionById(questionId);
    var question = myQuestion || {};

    // For Poll Locking, add this to the question table/model
    // countDownTime: 0

    return ({
      questionId: questionId,
      question: question,
      time: "0000"
    });
  },

  componentDidMount: function () {
    this.questionListener = QuestionStore.addListener(this._onChange);
    this.errorListener = ErrorStore.addListener(this._handleErrors);
    var location = window.location.hash.slice(0,11);
    ClientQuestionActions.getQuestionById(this.state.questionId, location);
  },

  componentWillUnmount: function () {
    this.errorListener.remove();
    this.questionListener.remove();
    window.setTimeout(function() {
      ErrorActions.clearErrors();
    }, 0);
  },

  _handleErrors: function () {
    alert(ErrorStore.getErrors());
    this.context.router.push("surveys");
  },

  _onChange: function () {
    var myQuestion = QuestionStore.getQuestionById(this.state.questionId);
    var question = myQuestion || {};
    this.setState({ question: question });
  },

  handleTimerClick: function () {
    var convertedTime = this.convertTimeToMilliseconds();
    // This works, but add in the POLL LOCK functions later

    // window.setTimeout(function(){
    //   ClientQuestionActions.toggleLock(this.state.questionId)
    // }.bind(this), convertedTime);

    // this.setState({ time: "0000", countDownTime: convertedTime / 1000 })
  },

  timerChange: function (e) {
    var input = parseInt((e.target.value).slice(5));
    var myTime = this.state.time;

    if (TimeConstants.ACCEPTABLE_VALUES.includes(input)){
      var myTime = myTime.slice(1) + input;
    }

		this.setState({ time: myTime });
  },

  convertTimeToMilliseconds: function () {
    var myTime = this.state.time;
    var minutes = parseInt(myTime.slice(0, 2));
    var seconds = parseInt(myTime.slice(2, 4));

    var minutes = minutes * 60;

    return (minutes + seconds) * 1000;
  },

  handleActiveToggle: function () {
    ClientQuestionActions.toggleActive(this.state.questionId);
  },

  render: function () {
    var myAnswerObjects;
    var myAnswerArray = [];
    var question = "";
    var username = "";

    if (this.state.question.question !== undefined){
      question = this.state.question.question;
      username = this.state.question.author.username;
      if (question.length > 50) {
        question = question.slice(0, 47) + "...";
      }
    };

    if (Object.keys(this.state.question).length !== 0) {
      myAnswerObjects = this.state.question["answers"];
      myAnswerArray = myAnswerObjects.map(function(answer){
        return answer["answer"];
      });
    }

    var myAnswers = myAnswerArray.map(function(currentAnswer, idx){
      return (
        <li key={ idx }>
          { currentAnswer }
        </li>
      )
    });

    var inactiveQuestionPrompt = (
      <div>
        <div className="fa fa-wifi active-icon-question-index-item"aria-hidden="true" />
        What question is active, respond at <strong>Ask--Anything.HerokuApp.com/{ username }</strong>
      </div>
    );

    var activeQuestionPrompt = (
      <div>
        <div className="fa fa-desktop active-icon-question-index-item"aria-hidden="true" />
        Respond at <strong>Ask--Anything.HerokuApp.com/{ username }</strong>
      </div>
    );

    if (this.state.question.active) {
      inactiveQuestionPrompt = "";
    } else {
      activeQuestionPrompt = "";
    }

    var myTime = this.state.time;
    var time = myTime.slice(0,2) + ":" + myTime.slice(2,4);

    var countdown = "";

    var activeQuestion = "toggle-button-active ";
    var inactiveToggle = "toggle-button-inactive ";

    if (!this.state.question.active) {
      activeQuestion = "";
    }


    return (
      <div className="questionindexitem-container group">
        <QuestionIndexItemToolbar />
        <div className="question-graph-container group">
          <div className="my-current-question">
            { question }
          </div>

          <div className="question-prompt">
            { inactiveQuestionPrompt }
            { activeQuestionPrompt }
          </div>

          <div className="answers-graph-container group">
            <div className="answers-graph group">
              <ul className="answers-graph-left">
                { myAnswers }
              </ul>
              <div className="answers-graph-right">
                GRAPH HERE
              </div>
            </div>
            <ul className="question-toggle-buttons">
              <li
                className={ "fa fa-wifi " + activeQuestion + inactiveToggle }
                onClick={ this.handleActiveToggle }
                />

            </ul>
          </div>

          <div className="graph-bottom group">
            <ul className="question-index-item-timer group">
              <img
                className="hover-pointer logo-image"
                src={window.askAnythingAssets.logo}
                width="25" height="25" alt="Logo"
                />
              <div className="graph-bottom-logo-text">
                Ask Anything!
              </div>
              <li className="question-timer-input group soft-edges">
                <input
                  className="time-input-field soft-edges hover-text"
                  type="text"
                  value={ time }
                  onChange={ this.timerChange }
                  />

                <div
                  className="fa fa-clock-o clock-icon hover-pointer"
                  aria-hidden="true"
                  onClick={ this.handleTimerClick }
                />
              </li>
            </ul>
            <div className="countdown-time">
              { countdown }
            </div>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = QuestionIndexItem;
