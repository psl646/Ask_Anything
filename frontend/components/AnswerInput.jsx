var React = require('react');
var QuestionFormActions = require('../actions/question_form_actions');
var QuestionFormStore = require('../stores/question_form_store');

var AnswerInput = React.createClass({
  getInitialState: function () {
    var answer = this.props.answer || "";
    return ({ answer: answer });
  },

  componentDidMount: function () {
    window.setTimeout(function () {
      this.sendAnswerToStore();
    }.bind(this), 0);
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

  deleteAnswer: function (e) {
    QuestionFormActions.deleteAnswerToQuestion(this.props.questionId, this.props.answerId)
  },

	render: function () {
    var answerContainer = "single-answer-container";

    var answerInput = (
      <input
        className="single-answer-input h12"
        type="text"
        value={this.state.answer}
        placeholder="Text, Image URL, or LaTeX"
        onChange={this.answerChange}
        />
    );

    if (window.location.hash.slice(2, 11).toUpperCase() === "QUESTIONS") {
      answerInput = (
        <li>
          <input
            className="edit-question-answer-input"
            autoFocus
            type="text"
            value={ this.state.answer }
            placeholder="Type text or upload an image to use as choice"
            onChange={this.answerChange}
            />
          <div id={ this.props.answerId }
              className="delete-answer-edit-form hover-pointer"
              onClick={"li", this.deleteAnswer }>
              X
            </div>
        </li>
      );

      answerContainer = "edit-question-answer-input-container";
    }

    return (
      <div className={ answerContainer }>
        { answerInput }
      </div>
		);
	}
});

module.exports = AnswerInput;
