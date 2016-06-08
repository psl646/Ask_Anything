var React = require('react');
var Link = require('react-router').Link;
var QuestionConstants = require('../constants/question_constants');
var AnswerInput = require('./AnswerInput');
var QuestionFormStore = require('../stores/question_form_store');
var QuestionFormActions = require('../actions/question_form_actions');

var QuestionEditForm = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return ({ question: "you got the question!"})
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
    QuestionFormActions.sendQuestionFormData(this.props.questionId, questionFormData)
  },

  componentDidMount: function () {
    this.questionFormListener = QuestionFormStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.questionFormListener.remove();
  },

  _onChange: function () {

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
    console.log(this.props.params);
    return (
        <div>
          { this.state.question }
        </div>
    )
	}
});

module.exports = QuestionEditForm;
