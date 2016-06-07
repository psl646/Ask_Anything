var React = require('react');
var ReactDOM = require('react-dom');
var Link = require('react-router').Link;
var QuestionConstants = require('../constants/question_constants');
var AnswerInput = require('./AnswerInput');
var QuestionFormStore = require('../stores/question_form_store');
var QuestionFormActions = require('../actions/question_form_actions');

var QuestionForm = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    var myAnswers = QuestionFormStore.getAllAnswers(this.props.questionId);
    var answers = myAnswers || { 1: "", 2: "" };
    // Will need to come back here to make this more robust for other question categories

    return ({
      question: this.props.question,
      category: "Multiple Choice",
      answerId: 3,
      answers: answers,
      answerFormObjects: {
        1: <AnswerInput answerId="1" questionId={ this.props.questionId } />,
        2: <AnswerInput answerId="2" questionId={ this.props.questionId } />
      }
    });
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
    this.sendQuestionFormData();
    this.questionFormListener = QuestionFormStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.questionFormListener.remove();
  },

  _onChange: function () {
    var question = QuestionFormStore.getQuestionFormById(this.props.questionId)

    var myAnswers = QuestionFormStore.getAllAnswers(this.props.questionId);
    var answers = myAnswers || { 1: "", 2: "" };

    this.setState({
      question: question.question,
      category: question.category,
      answers: question.answers
    });
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

	render: function () {
    console.log("QuestionForm Rendering. QuestionForm answers:");
    console.log(this.state.answers);

    var that = this;

    var categories = QuestionConstants.QUESTION_CATEGORIES.map(function(category, idx) {
      var isChecked = "";

      if (that.state.category === category) {
        isChecked = "category-checked"
      }

      // currently set to readOnly as I am just working on Multiple Choice

      return (
        <li key={ idx } className={ "category-li " + isChecked }>
          <label className="category-label">
            <input
              readOnly
              form="questionform"
              type="radio"
              name={"questionCategory"+idx}
              value={ category }
              checked={ that.state.category === category }
              onChange={that.categoryChange}
              />
            <div className="category-name h12">
              { category }
            </div>
            </label>
        </li>
      );
    });

    var myNewAnswers = Object.keys(that.state.answerFormObjects).map(function(answerId){
      return (
        <li key={ answerId }>
          { that.state.answerFormObjects[answerId] }
        </li>
      );
    });

    return (
      <div className="single-question-form soft-edges">
        <button className="delete-question" onClick={ this.handleDeleteQuestion }>
          X
        </button>

        <br />
        <label className="text-shift-left"> Question: <br/>
          <input
            autoFocus
            form="questionform"
            className="question-input-field margin-auto"
            type="text"
            value={this.state.question}
            onChange={this.questionChange} />
        </label>

        <br />
        <div className="text-shift-left h12">
          How will my audience respond?
        </div>
        <div className="answer-choice-type group">
          <ul className="category-container">
            { categories }
          </ul>

          <ul className="answer-container">
            <div className="answer-text h12">
              Your audience can select from these answers:
            </div>
            { myNewAnswers }
            <div
              className="hover-pointer h9-5 soft-edges add-answer-button"
              onClick={ this.addAnswersChange }>
              Add an answer
            </div>
          </ul>
        </div>

      </div>
		);
	}
});

module.exports = QuestionForm;
