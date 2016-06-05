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
      <div className="single-answer-input">
        <input
          type="text"
          value={this.state.answer}
          onChange={this.answerChange}
          />
      </div>
		);
	}
});

module.exports = AnswerInput;
