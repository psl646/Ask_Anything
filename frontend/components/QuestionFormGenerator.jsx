var React = require('react');
var ClientQuestionActions = require('../actions/client_question_actions');

var QuestionFormGenerator = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return ({ numberQuestions: 0 });
  }

  componentDidMount: function () {

  },

  componentWillUnmount: function () {

  },

  _onChange: function () {

  },

  handleSubmit: function (e) {
    e.preventDefault();

    var formData = {

    };


  },

  handleQuestionChange: function () {
    this.setState({ numberQuestions: (this.state.numberQuestions + 1) });
  }

	render: function () {
    return (
      <div>
        This is the Question Form Generator
        <form onSubmit={ this.handleSubmit } >

        </form>
      </div>
		);
	}
});

module.exports = QuestionFormGenerator;
