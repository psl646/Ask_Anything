var React = require('react');
var ReactDOM = require('react-dom');
var Link = require('react-router').Link;
var QuestionConstants = require('../constants/question_constants');
var AnswerInput = require('./AnswerInput');

var QuestionForm = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return ({
      question: this.props.question,
      category: "Multiple Choice",
      answers: [<AnswerInput />, <AnswerInput />]
    });
  },

  componentDidMount: function () {

  },

  componentWillUnmount: function () {

  },

  _onChange: function () {

  },

	handleSubmit: function (e) {
		e.preventDefault();

		var formData = {
      question: this.state.question,
      category: this.state.category,
      answers: this.state.answers
		};
	},

  questionChange: function (e) {
    var newQuestion = e.target.value;
    this.setState({ question: newQuestion});
  },

  categoryChange: function (e) {
    var newCategory = e.target.value;
    this.setState({ category: newCategory});
  },

  addAnswersChange: function (e) {
    this.setState({ answers: this.state.answers.concat(<AnswerInput />) })
  },

  handleDeleteQuestion: function (e) {
    e.preventDefault();
    console.log("You clicked on delete!");
  },

	render: function () {
    var categories = QuestionConstants.QUESTION_CATEGORIES.map(function(category, idx) {
      var isChecked = "";

      if (this.state.category === category) {
        isChecked = "category-checked"
      }

      return (
        <li key={ idx } className={ "category-li " + isChecked }>
          <label className="category-label">
            <input
              form="questionform"
              type="radio"
              name={"questionCategory"+idx}
              value={ category }
              checked={ this.state.category === category }
              onChange={this.categoryChange}
              />
            <div className="category-name h12">
              { category }
            </div>
            </label>
        </li>
      );
    }.bind(this));

    var myNewAnswers = this.state.answers.map(function(answer, idx){
      return (
        <li key={ idx }>
          { answer }
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
