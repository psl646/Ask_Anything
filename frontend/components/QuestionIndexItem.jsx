var Link = require('react-router').Link;
var React = require('react');
var ReactHighcharts = require('react-highcharts');
// actions
var ClientQuestionActions = require('../actions/client_question_actions');
// components
var Graph = require('./Graph');
var QuestionIndexItemToolbar = require('./QuestionIndexItemToolbar');
var Timebar = require('./Timebar');
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
    });
  },

  componentDidMount: function () {
    this.questionListener = QuestionStore.addListener(this._onChange);
    var location = window.location.hash.slice(0,11);

    ClientQuestionActions.getQuestionById(this.state.questionId, location);
  },

  componentWillUnmount: function () {
    this.questionListener.remove();
  },

  _onChange: function () {
    var myQuestion = QuestionStore.getQuestionById(this.state.questionId);
    var question = myQuestion || {};
    this.setState({ question: question });
  },

  handleActiveToggle: function () {
    ClientQuestionActions.toggleActive(this.state.questionId);
  },

  render: function () {
    var that = this;
    var username = "";

    if (Object.keys(this.state.question).length !== 0){
        username = this.state.question.author.username;
    }

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
          </div>
        </div>
      </div>
    );
  }
});

module.exports = QuestionIndexItem;
