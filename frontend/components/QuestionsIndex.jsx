var React = require('react');
var ClientQuestionActions = require('../actions/client_question_actions');
var QuestionStore = require('../stores/question_store');
var Link = require('react-router').Link;
var SessionStore = require('../stores/session_store');

var QuestionsIndex = React.createClass ({
  getInitialState: function () {
    return ({ questions: QuestionStore.all() });
  },

  componentDidMount: function () {
    this.questionListener = QuestionStore.addListener(this._onChange);
    ClientQuestionActions.fetchAllQuestions();
  },

  componentWillUnmount: function () {
    this.questionListener.remove();
  },

  _onChange: function () {
    this.setState({ questions: QuestionStore.all() });
  },

  render: function () {
    var questions = this.state.questions;
    var mySurvey = this.props.survey;
    var questionsList = Object.keys(questions).map(function (question_id) {
      if (questions[question_id].survey_id === parseInt(mySurvey.id)){
        return (
          <li key={ question_id }>
            <Link to={ "questions/" + question_id }>{ questions[question_id].question }</Link>
          </li>
        );
      }
    });

    return (
      <div>
        { questionsList }
      </div>
    )
  }
});

module.exports = QuestionsIndex;
