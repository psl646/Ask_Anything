var React = require('react');
var Link = require('react-router').Link;
var Modal = require('react-modal');
var ModalConstants = require('../constants/modal_constants');
var QuestionStore = require('../stores/question_store');
var DeleteQuestion = require('./DeleteQuestion');
var ClientQuestionActions = require('../actions/client_question_actions');

var QuestionIndexItemToolbar = React.createClass ({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    var questionId = parseInt(window.location.hash.split("?")[0].split("questions")[1].split("/")[1]);
    var myQuestion = QuestionStore.getQuestionById(questionId);
    var question = myQuestion || {};

    return ({ questionId: questionId, question: question, modalOpen: false });
  },

  componentDidMount: function () {
    this.questionFormListener = QuestionStore.addListener(this._onChange);
    ClientQuestionActions.getQuestionById(this.state.questionId);
  },

  componentWillUnmount: function () {
    this.questionFormListener.remove();
  },

  _onChange: function () {
    var myQuestion = ClientQuestionActions.getQuestionById(this.state.questionId);
    var question = myQuestion || {};
    this.setState ({ question: question });
  },

  closeModal: function(){
    this.setState({ modalOpen: false })
  },

  openModal: function(){
    this.setState({ modalOpen: true })
  },

  isEditPage: function () {
    var path = window.location.hash.split("?")[0].slice(2).toLowerCase();
    return (path.startsWith("questions") && path.endsWith("edit"));
  },

  handleDeleteClick: function (e) {
    e.preventDefault();
    this.openModal();
  },

  render: function () {
    var questionId = parseInt(window.location.hash.split("?")[0].slice(12).split("/")[0]);

    var bottomOptions = "";

    var bottomOptions = (
      <ul className="bottomOptions-question-menu">
        <Link to={ "questions/" + questionId + "/edit" } className="bottomOptions-options">Edit</Link>
        <Link to="export" className="bottomOptions-options">Export</Link>
        <Link to="surveys" className="bottomOptions-options" onClick={ this.handleDeleteClick } >Delete
          <Modal
            isOpen={ this.state.modalOpen }
            onRequestClose={ this.closeModal }
            style={ ModalConstants.DELETE_QUESTION }>

              <DeleteQuestion question={ this.state.question } closeThisModal={ this.closeModal } />

          </Modal>
        </Link>
      </ul>
    )

    // DO SOMETHING HERE
    if (this.isEditPage()) {

    };

    return (
      <div className="questionindexitem-toolbar">

        <ul>
          <li>
            How people can respond
          </li>
          <li>
            Response settings
          </li>
          <li>
            Schedule lock/unlock times
          </li>
        </ul>

        { bottomOptions }

      </div>
    )
  }
});

module.exports = QuestionIndexItemToolbar;
