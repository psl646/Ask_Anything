var React = require('react');
var Link = require('react-router').Link;
var ClientQuestionActions = require('../actions/client_question_actions');

var DeleteQuestion = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return ({ question: this.props.question, questionId: this.props.questionId });
  },

  componentDidMount: function () {
  },

  componentWillUnmount: function () {
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

	render: function () {

    return (
      <div>
        <div>
          Delete question
        </div>

        <div>
          { "Are you sure you want to remove the question \"" + this.state.question + "\"?" }
        </div>

        <div>
          If you click OK this question will be gone forever!
        </div>
        <ul className="delete-question-modal-options-container group">
          <li className="cancel-delete-question hover-underline hover-pointer text-center" onClick={ this.closeMyself }>
            Cancel
          </li>
          <li className="confirm-delete-question soft-edges" onClick={ this.handleOKClick }>
            OK
          </li>
        </ul>
      </div>
		);
	}
});

module.exports = DeleteQuestion;
