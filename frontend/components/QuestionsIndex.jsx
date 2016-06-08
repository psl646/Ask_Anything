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
    console.log("QUESTION STORE DID SOMETHING!");
    this.setState({ questions: QuestionStore.all() });
    // if (window.location.hash.slice(2, 9).toUpperCase() === "SURVEYS") {
    // }
  },

  clickedOnEdit: function (e) {
    return (e.target.outerHTML.split('"')[1] === "edit-question-link")
  },

  clickedOnActive: function (e){
    return (e.target.outerHTML.split('"')[1].slice(0,10) === "fa fa-wifi")
  },

  handleClickOnQuestionItem: function (e) {
    e.preventDefault();

    // Come back here to do a REGEX thing to grab the question id
    var targetString = e.currentTarget.outerHTML;
    var questionId = targetString.split('"')[1];
    var url = "questions/" + questionId;

    if (this.clickedOnActive(e)){
      ClientQuestionActions.toggleActive(parseInt(questionId));
    } else {
      if (this.clickedOnEdit(e)){
        url = url + "/edit";
      }
      this.context.router.push(url);
    }
  },

  render: function () {
    console.log(this.state.questions);

    var that = this;
    var questions = this.state.questions;
    var mySurvey = this.props.survey;

    var questionsList = Object.keys(questions).map(function (question_id) {
      var activeQuestion = "nonactive-question";
      var activatedIcon = "nonactivated-icon";

      // Sorts questions into their surveys
      var currentQuestion = questions[question_id];
      if (currentQuestion["survey_id"] === parseInt(mySurvey.id)){
        if (currentQuestion["active"]) {
          activeQuestion = "active-question";
          activatedIcon = "activated-icon";
        };

        return (
          <li id={ question_id } key={ question_id } className={ "h13 " + activeQuestion } onClick={"li", that.handleClickOnQuestionItem }>
            <div>{ currentQuestion["question"] }</div>
            <Link to={"questions/" + question_id + "/edit"} className="edit-question-link"> Edit </Link>
            <div className={ "fa fa-wifi active-icon " + activatedIcon } id={ question_id } aria-hidden="true" />
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
