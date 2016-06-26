var React = require('react');
var ClientQuestionActions = require('../actions/client_question_actions');

var DeleteQuestion = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return ({ question: this.props.question, questionId: this.props.questionId });
  },

  closeMyself: function () {
    this.props.closeThisModal();
  },

	handleOKClick: function (e) {
		e.preventDefault();
    this.closeMyself();
    window.setTimeout(function(){
      this.context.router.push("surveys");
      ClientQuestionActions.deleteQuestion(this.state.questionId);
    }.bind(this), 0);
  },

  deleteQuestionText: function () {
    var question = this.state.question;
    if (question.length > 50) { question = question.slice(0, 47) + "..."; }

    return (
      <div>
        <div className="h18 bold">Delete question</div>
        <div className="question-delete-question">
          { "Are you sure you want to remove the question \"" + question + "\"?" }
          <br/><br/>
          If you click OK this question will be gone forever!
        </div>
      </div>
    );
  },

  choices: function () {
    return (
      <ul className="delete-question-modal-options-container group">
        <li className="cancel-delete-question hover-underline hover-pointer text-center"
          onClick={ this.closeMyself }>
          Cancel
        </li>
        <li className="confirm-delete-question soft-edges hover-pointer"
          onClick={ this.handleOKClick }>
          OK
        </li>
      </ul>
    );
  },

	render: function () {
    return (
      <div>
        { this.deleteQuestionText() }
        { this.choices() }
      </div>
		);
	}
});

module.exports = DeleteQuestion;
