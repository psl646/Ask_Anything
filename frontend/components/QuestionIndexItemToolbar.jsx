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
    return ({ questionId: questionId, question: {}, modalOpen: false });
  },

  componentDidMount: function () {
    this.questionFormListener = QuestionStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.questionFormListener.remove();
  },

  _onChange: function () {
    var myQuestion = QuestionStore.getQuestionById(this.state.questionId);
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
    var that = this;
    var bottomOptions = "";

    var bottomOptions = (
      <ul className="bottomOptions-question-menu">
        <Link to={ "questions/" + that.state.questionId + "/edit" } className="bottomOptions-options">Edit</Link>
        <Link to="export" className="bottomOptions-options">Export</Link>
        <Link to="surveys" className="bottomOptions-options" onClick={ that.handleDeleteClick } >Delete
          <Modal
            isOpen={ that.state.modalOpen }
            onRequestClose={ that.closeModal }
            style={ ModalConstants.DELETE_QUESTION }>

              <DeleteQuestion question={ that.state.question.question } questionId={ that.state.questionId } closeThisModal={ that.closeModal } />

          </Modal>
        </Link>
      </ul>
    )

    if (this.isEditPage()) {
      var bottomOptions = "";
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
