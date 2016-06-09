var React = require('react');
var ClientQuestionActions = require('../actions/client_question_actions');
var QuestionStore = require('../stores/question_store')
var QuestionIndexItemToolbar = require('./QuestionIndexItemToolbar');
var TimeConstants = require('../constants/time_constants');

var QuestionIndexItem = React.createClass ({
  getInitialState: function () {
    var questionId = parseInt(window.location.hash.split("?")[0].split("questions")[1].split("/")[1]);
    var myQuestion = QuestionStore.getQuestionById(questionId);
    var question = myQuestion || {};

    return ({
      questionId: questionId,
      question: question,
      time: "0000"
    });
  },

  componentDidMount: function () {
    this.questionListener = QuestionStore.addListener(this._onChange);
    ClientQuestionActions.getQuestionById(this.state.questionId);
  },

  componentWillUnmount: function () {
    this.questionListener.remove();
  },

  _onChange: function () {
    var myQuestion = QuestionStore.getQuestionById(this.state.questionId);
    var question = myQuestion || {};
    this.setState({ question: question });
  },

  handleTimerClick: function () {
    console.log("You clicked the timer!");
  },

  timerChange: function (e) {
    var input = parseInt((e.target.value).slice(5));
    var myTime = this.state.time;

    if (TimeConstants.ACCEPTABLE_VALUES.includes(input)){
      var myTime = myTime.slice(1) + input;
    }

		this.setState({ time: myTime });
  },

  convertTime: function () {

  },

  render: function () {
    console.log(this.state.question);
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

    var myTime = this.state.time;
    var time = myTime.slice(0,2) + ":" + myTime.slice(2,4);


    return (
      <div className="questionindexitem-container group">
        <QuestionIndexItemToolbar />
        <ul className="question-graph-container">
          <div className="my-current-question">
            { question }
          </div>

          { inactiveQuestionPrompt }
          { activeQuestionPrompt }

          { myAnswers }

          <div className="graph-bottom">
            <ul className="question-index-item-timer">
              <img
                className="hover-pointer logo-image"
                src={window.askAnythingAssets.logo}
                width="25" height="25" alt="Logo"
                />
              <div>
                Ask Anything!
              </div>
              <li>
                <div>
                  <input
                    className="soft-edges hover-text"
                    type="text"
                    value={ time }
                    onChange={ this.timerChange }
                    />

                  <div
                    className="fa fa-clock-o hover-pointer"
                    aria-hidden="true"
                    onClick={ this.handleTimerClick }
                  />
                </div>
              </li>
            </ul>
          </div>
        </ul>
      </div>
    )
  }
});

module.exports = QuestionIndexItem;
