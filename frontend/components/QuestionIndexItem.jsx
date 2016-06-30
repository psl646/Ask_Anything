var React = require('react');
var Link = require('react-router').Link;
var ClientQuestionActions = require('../actions/client_question_actions');
var QuestionStore = require('../stores/question_store')
var QuestionIndexItemToolbar = require('./QuestionIndexItemToolbar');
var TimeConstants = require('../constants/time_constants');
var ClientQuestionActions = require('../actions/client_question_actions');
var ErrorStore = require('./../stores/error_store');

var QuestionIndexItem = React.createClass ({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    var questionId = parseInt(window.location.hash.split("?")[0].split("questions")[1].split("/")[1]);
    var myQuestion = QuestionStore.getQuestionById(questionId);
    var question = myQuestion || {};

    return ({
      questionId: questionId,
      question: question,
      time: "0000",
      timeBegin: 0,
      timeLeft: 0
    });
  },

  componentDidMount: function () {
    this.questionListener = QuestionStore.addListener(this._onChange);
    this.errorListener = ErrorStore.addListener(this._handleErrors);
    var location = window.location.hash.slice(0,11);

    ClientQuestionActions.getQuestionById(this.state.questionId, location);

    this.pusher = new Pusher('d7b6b378f3d562f7fd37', {
      encrypted: true
    });

    var channel = this.pusher.subscribe('question_' + this.state.questionId);
    channel.bind('response_recorded', function(data) {
      ClientQuestionActions.getQuestionById(this.state.questionId, location);
    }.bind(this));
  },

  componentWillUnmount: function () {
    if (this.timeCounter !== undefined) {
      window.clearInterval(this.timeCounter);
    }
    this.errorListener.remove();
    this.questionListener.remove();
    this.pusher.unsubscribe('question_' + this.state.questionId);
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
    this.setState({ time: "0000", timeBegin: convertedTime, timeLeft: convertedTime });
    window.setTimeout(function(){
      ClientQuestionActions.toggleActive(this.state.questionId);
    }.bind(this), convertedTime)
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

  sortAnswerObjects: function (answerObjects) {
    var sortedAnswerObjects = [];
    answerObjects.forEach(function(answer){
      sortedAnswerObjects[answer["id"]] = answer["answer"];
    });
    return Object.keys(sortedAnswerObjects).map(function(key){
      return sortedAnswerObjects[key];
    });
  },

  getTimePercentage: function () {
    var percentage;
    if (this.state.timeLeft === 0) {
      if (this.timeCounter !== undefined){
        window.clearInterval(this.timeCounter);
        this.timeCounter = undefined;
        this.state.timeBegin = 0;
      }
      return 0;
    } else {
      percentage = Math.floor(100 * (this.state.timeLeft / this.state.timeBegin));
    }

    if (this.timeCounter === undefined) {
      this.timeCounter = window.setInterval(function(){
        this.setState({timeLeft: this.state.timeLeft - 25})
      }.bind(this), 25);
    }


    return percentage;
  },

  render: function () {
    var that = this;
    var myAnswerObjects;
    var myAnswerArray = [];
    var question = "";
    var username = "";

    if (that.state.question.question !== undefined){
      question = that.state.question.question;
      username = that.state.question.author.username;
      if (question.length > 30) {
        question = question.slice(0, 27) + "...";
      }
    };

    var numResponses = 0;

    if (Object.keys(that.state.question).length !== 0) {
      if (that.state.question["responses"]) {
        var myResponseObjects = that.state.question["responses"];
        numResponses = myResponseObjects.length;
      }
    }

    var myGraphAnswerObject = {};

    var height;

    if (Object.keys(that.state.question).length !== 0) {

      myAnswerObjects = that.state.question["answers"];
      myAnswerArray = this.sortAnswerObjects(myAnswerObjects);
      myAnswerObjects.forEach(function(answer){
        myGraphAnswerObject[answer["id"]] = 0;
      });

      height = (500 / myAnswerArray.length);
      myResponseObjects = that.state.question["responses"];

      if (myResponseObjects) {
        myResponseObjects.forEach(function(responseObj){
          myGraphAnswerObject[responseObj["answer_id"]] += 1;
        });
      }
    }

    var myGraph = "";
    var graphKeys = Object.keys(myGraphAnswerObject);

    if (graphKeys !== 0) {
      if (that.state.question["responses"]) {
        if (that.state.question["responses"].length !== 0){
          myGraph = graphKeys.map(function(answerId){

            var width = (100/numResponses) * myGraphAnswerObject[answerId];

            var graphStyle = {
              height: height + "px",
              width: width + "%",
              background: "rgb(60, 116, 158)",
              color: "white",
              fontSize: "20px"
            };

            if (width.toString().length > 5) {
              width = width.toString().slice(0, 5) + "%";
            } else if (numResponses === 0) {
              width = "";
            } else {
              width = width + "%"
            }

            return (
              <li key= { answerId } style={ graphStyle }>
                <div className="percentage-graph">
                  { width }
                </div>
              </li>
            );
          });
        }
      }
    }

    var myHeight = {
      height: height + "px",
      position: "relative",
      top: (height/2) + "px"
    };

    var myAnswers = myAnswerArray.map(function(currentAnswer, idx){
      if (currentAnswer.length > 17) {
        currentAnswer = currentAnswer.slice(0, 14) + "...";
      }

      return (
        <li key={ idx } style={ myHeight } className="answer-item-single">
          { currentAnswer }
        </li>
      );
    });

    var inactiveQuestionPrompt = (
      <div>
        <div className="fa fa-wifi active-icon-question-index-item"aria-hidden="true" />
        What question is active, respond at <strong>Ask--Anything.HerokuApp.com/#/{ username }</strong>
      </div>
    );

    var activeQuestionPrompt = (
      <div>
        <div className="fa fa-desktop active-icon-question-index-item"aria-hidden="true" />
        Respond at <strong><Link to={ "/" + username } className="hover-pointer">Ask--Anything.HerokuApp.com/#/{ username }</Link></strong>
      </div>
    );

    if (that.state.question.active) {
      inactiveQuestionPrompt = "";
    } else {
      activeQuestionPrompt = "";
    }

    var myTime = that.state.time;
    var time = myTime.slice(0,2) + ":" + myTime.slice(2,4);

    var percentage = this.getTimePercentage();
    var countdownTimeBar = {
      width: percentage + "%",
      height: "100%",
      background: "green"
    };

    var activeQuestion = "toggle-button-active ";
    var inactiveToggle = "toggle-button-inactive ";

    if (!that.state.question.active) {
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
              <ul className="answers-graph-right group">
                { myGraph }
              </ul>
            </div>
            <ul className="question-toggle-buttons">
              <li
                className={ "fa fa-wifi hover-pointer " + activeQuestion + inactiveToggle }
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
              <div style={ countdownTimeBar }>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = QuestionIndexItem;
