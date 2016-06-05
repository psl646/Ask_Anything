var React = require('react');

var AnswerInput = React.createClass({
  getInitialState: function () {
    return ({ answer: "" });
  },

  componentDidMount: function () {
    this.questionListener = QuestionStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.questionListener.remove();
  },

  _onChange: function () {
    this.setState({ answer: "" })
  },

  answerChange: function (e) {
    var newAnswer = e.target.value;
    this.setState({ answer: newAnswer });
  },

	render: function () {
    return (
      <li>
        <input
          type="text"
          value={this.state.answer}
          onChange={this.answerChange}
          />
      </li>
		);
	}
});

module.exports = AnswerInput;
