var Link = require('react-router').Link;
var React = require('react');
var ReactHighcharts = require('react-highcharts');
// actions
var ClientQuestionActions = require('../actions/client_question_actions');
// components
var Graph = require('./Graph');
var QuestionIndexItemToolbar = require('./QuestionIndexItemToolbar');
// constants
var TimeConstants = require('../constants/time_constants');
// stores
var ErrorStore = require('./../stores/error_store');
var QuestionStore = require('../stores/question_store')

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
    if (this.state.timeLeft === 0){
      var convertedTime = this.convertTimeToMilliseconds();
      this.setState({ time: "0000", timeBegin: convertedTime, timeLeft: convertedTime });
      window.setTimeout(function(){
        ClientQuestionActions.toggleActive(this.state.questionId);
      }.bind(this), convertedTime)
    }
  },

  timerChange: function (e) {
    if (this.state.timeLeft === 0){
      var input = parseInt((e.target.value).slice(5));
      var myTime = this.state.time;

      if (TimeConstants.ACCEPTABLE_VALUES.includes(input)){
        var myTime = myTime.slice(1) + input;
      }

      this.setState({ time: myTime });
    }
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
      percentage = 100 * (this.state.timeLeft / this.state.timeBegin);
    }

    if (this.timeCounter === undefined) {
      this.timeCounter = window.setInterval(function(){
        this.setState({timeLeft: this.state.timeLeft - 10})
      }.bind(this), 10);
    }

    return percentage;
  },

  getColor: function(percentage){
    if (percentage > 67){
      return "green";
    } else if (percentage > 34){
      return "yellow";
    } else {
      return "red";
    }
  },

  render: function () {
    var that = this;
    var username = "";
    var url = window.location.href;
    var hostNameArray = url.split("#")[0].split('/');
    var hostName = hostNameArray[hostNameArray.length - 2];

    var inactiveQuestionPrompt = (
      <div>
        <div className="fa fa-wifi active-icon-question-index-item"aria-hidden="true" />
        When question is active, respond at<br />
        <strong>
          { hostName }/#/{ username } or text answer to 914-292-3261
        </strong>
      </div>
    );

    var activeQuestionPrompt = (
      <div>
        <div className="fa fa-desktop active-icon-question-index-item"aria-hidden="true" />
        Question is active, respond at<br />
        <strong>
          <Link to={ "/" + username } className="hover-pointer highlight-pointer">{ hostName }/#/{ username }</Link> or text answer to 914-292-3261
        </strong>
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
    var color = this.getColor(percentage);
    var countdownTimeBar = {
      width: percentage + "%",
      height: "100%",
      background: color
    };

    var activeQuestion = "toggle-button-active ";
    var inactiveToggle = "toggle-button-inactive ";

    if (!that.state.question.active) {
      activeQuestion = "";
    }

    var timeLi = (
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
    );

    return (
      <div className="questionindexitem-container group">
        <QuestionIndexItemToolbar />
        <div className="question-graph-container group">
          <div className="my-current-question">
            { inactiveQuestionPrompt }
            { activeQuestionPrompt }
          </div>

          <div className="answers-graph-container group">
            <div className="answers-graph group">
              <Graph questionId={ this.state.questionId } />
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
                className="logo-image"
                src={window.askAnythingAssets.logo}
                width="25" height="25" alt="Logo"
                />
              <div className="graph-bottom-logo-text">
                Ask Anything!
              </div>
              { timeLi }
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
