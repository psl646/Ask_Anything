var React = require('react');
var QuestionFormActions = require('../actions/question_form_actions');
var QuestionFormStore = require('../stores/question_form_store');

var AnswerInput = React.createClass({
  getInitialState: function () {
    return ({ answer: "" });
  },

  componentDidMount: function () {
  },

  componentWillUnmount: function () {
  },

  _onChange: function () {
  },

  answerChange: function (e) {
    var newAnswer = e.target.value;
    this.state.answer = newAnswer;
    this.sendAnswerToStore();
    this.setState({ answer: newAnswer });
  },

  sendAnswerToStore: function () {
    var questionId = this.props.questionId;
    var answerId = this.props.answerId;
    var answer = this.state.answer;
    QuestionFormActions.addAnswerToQuestion(questionId, answerId, answer);
  },

	render: function () {
    return (
      <div className="single-answer-container">
        <input
          className="single-answer-input h12"
          type="text"
          value={this.state.answer}
          placeholder="Text, Image URL, or LaTeX"
          onChange={this.answerChange}
          />
      </div>
		);
	}
});

module.exports = AnswerInput;
