var React = require('react');
var ClientQuestionActions = require('../actions/client_question_actions');
var QuestionStore = require('../stores/question_store')
var QuestionIndexItemToolbar = require('./QuestionIndexItemToolbar');

var QuestionIndexItem = React.createClass ({
  getInitialState: function () {
    var questionId = parseInt(window.location.hash.split("?")[0].split("questions")[1].split("/")[1]);
    var myQuestion = QuestionStore.getQuestionById(questionId);
    var question = myQuestion || {};

    return ({ questionId: questionId, question: question });
  },

  componentDidMount: function () {
    this.questionListener = QuestionStore.addListener(this._onChange);
    ClientQuestionActions.getQuestionById(this.state.questionId);
  },

  componentWillUnmount: function () {
    this.questionListener.remove();
  },

  _onChange: function () {
    var myQuestion = QuestionStore.getQuestionById(this.state.questionId);
    var question = myQuestion || {};
    this.setState({ question: question });
  },

  render: function () {
    var myAnswerObjects;
    var myAnswerArray = [];

    if (Object.keys(this.state.question).length !== 0) {
      myAnswerObjects = this.state.question["answers"];
      myAnswerArray = myAnswerObjects.map(function(answer){
        return answer["answer"];
      });
    }

    var myAnswers = myAnswerArray.map(function(currentAnswer, idx){
      return (
        <li key={ idx }>
          { currentAnswer }
        </li>
      )
    });

    return (
      <div className="questionindexitem-container group">
        <QuestionIndexItemToolbar />
        <ul className="question-graph-container">
          { this.state.question.question }
          { myAnswers }
        </ul>
      </div>
    )
  }
});

module.exports = QuestionIndexItem;
