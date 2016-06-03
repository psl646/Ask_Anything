var React = require('react');
var ClientQuestionActions = require('../actions/client_question_actions');
var QuestionStore = require('../stores/question_store')


var QuestionIndexItem = React.createClass ({
  getInitialState: function () {
    var questionId = parseInt(this.props.params.questionId);
    var question = QuestionStore.getQuestionById(questionId) || {};
    return ({ question: question });
  },

  componentDidMount: function () {
    this.questionListener = QuestionStore.addListener(this._onChange);
    ClientQuestionActions.getQuestionById(parseInt(this.props.params.questionId));
  },

  componentWillUnmount: function () {
    this.questionListener.remove();
  },

  _onChange: function () {
    var questionId = parseInt(this.props.params.questionId);
    var question = QuestionStore.getQuestionById(questionId) || {};
    this.setState({ question: question });
  },
  render: function () {
    return (
      <div>
        { this.state.question.question }
      </div>
    )
  }
});

module.exports = QuestionIndexItem;
