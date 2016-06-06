var React = require('react');

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
    this.setState({ answer: newAnswer });
  },

	render: function () {
    return (
      <div className="single-answer-container">
        <input
          form="questionform"
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
