var React = require('react');
var ClientQuestionActions = require('../actions/client_question_actions');
var QuestionStore = require('../stores/question_store');
var Link = require('react-router').Link;
var SessionStore = require('../stores/session_store');

var QuestionsIndex = React.createClass ({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

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
    if (window.location.hash.slice(2, 9).toUpperCase() === "SURVEYS") {
      this.setState({ questions: QuestionStore.all() });
    }
  },

  clickedOnEdit: function (e) {
    return (e.target.outerHTML.split('"')[1] === "edit-question-link")
  },

  handleClickOnQuestionItem: function (e) {
    e.preventDefault();

    // Come back here to do a REGEX thing to grab the question id
    var targetString = e.currentTarget.outerHTML;
    var url = "questions/" + targetString.split('"')[1];

    if (this.clickedOnEdit(e)){
      url = url + "/edit";
    }

    this.context.router.push(url);
  },

  render: function () {
    var that = this;
    var questions = this.state.questions;
    var mySurvey = this.props.survey;

    var questionsList = Object.keys(questions).map(function (question_id) {
      if (questions[question_id].survey_id === parseInt(mySurvey.id)){
        return (
          <li id={ question_id } key={ question_id } className="h13" onClick={"li", that.handleClickOnQuestionItem }>
            <div>{ questions[question_id].question }</div>
            <Link to={"questions/" + question_id + "/edit"} className="edit-question-link"> Edit </Link>
          </li>
        );
      }
    });

    return (
      <div className="question-index-list">
        { questionsList }
      </div>
    )
  }
});

module.exports = QuestionsIndex;
