var React = require('react');
var Link = require('react-router').Link;
var QuestionConstants = require('../constants/question_constants');
var AnswerInput = require('./AnswerInput');
var QuestionStore = require('../stores/question_store');
var QuestionFormStore = require('../stores/question_form_store');
var QuestionFormActions = require('../actions/question_form_actions');
var ClientQuestionActions = require('../actions/client_question_actions');
var QuestionIndexItemToolbar = require('./QuestionIndexItemToolbar');

var QuestionEditForm = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    var questionId = parseInt(window.location.hash.split("?")[0].split("questions")[1].split("/")[1]);
    var myQuestion = QuestionStore.getQuestionById(questionId);
    var question = myQuestion || {};

    return ({ questionId: questionId, question: question });
  },

  myQuestionFormData: function () {
    return ({
      question: this.state.question,
      category: this.state.category,
      answers: this.state.answers
    });
  },

  sendQuestionFormData: function () {
    var questionFormData = this.myQuestionFormData();
    QuestionFormActions.sendQuestionFormData(this.state.questionId, questionFormData);
  },

  componentDidMount: function () {
    this.questionFormListener = QuestionStore.addListener(this._onChange);
    ClientQuestionActions.getQuestionById(this.state.questionId);
  },

  componentWillUnmount: function () {
    this.questionFormListener.remove();
  },

  _onChange: function () {
    var myQuestion = QuestionStore.getQuestionById(this.state.questionId);
    var question = myQuestion || {};
    this.setState ({ question: question });
  },

  questionChange: function (e) {
    var newQuestion = e.target.value;
    this.state.question = newQuestion;
    this.sendQuestionFormData();
  },

  categoryChange: function (e) {
    var newCategory = e.target.value;
    this.state.category = newCategory;
    this.sendQuestionFormData();
  },

  addAnswersChange: function (e) {
    var newAnswer = <AnswerInput answerId={ this.state.answerId } questionId={ this.props.questionId } />;
    var answerId = this.state.answerId;

    this.state.answers[answerId]= "";
    this.state.answerFormObjects[answerId]= newAnswer;
    this.state.answerId = answerId + 1;

    this.sendQuestionFormData();
  },

  handleDeleteQuestion: function (e) {
    e.preventDefault();
    this.questionFormListener.remove();
    QuestionFormActions.deleteQuestion(this.props.questionId);
  },

  handleDeleteAnswer: function (e) {
    e.preventDefault();
    var answerId = e.target.outerHTML.slice(9).split('"')[0];
    QuestionFormActions.deleteAnswerToQuestion(this.props.questionId, answerId);
  },

	render: function () {
    return (
      <div className="edit-form-page-container group">
        <QuestionIndexItemToolbar />

        <div className="edit-form-container">
          { this.state.question["question"] }
        </div>
      </div>
    )
	}
});

module.exports = QuestionEditForm;
