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
    return ({ questionId: questionId, question: {}, modalOpen: false, configure: true, test: false, present: false });
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

  handleSaveClick: function (e) {
    e.preventDefault();
    // FORM DATA SEND UP
  },

  handleConfigureClick: function () {
    this.setState({ configure: true, test: false, present: false });
  },

  handleTestClick: function () {
    this.setState({ configure: false, test: true, present: false });
  },

  handlePresentClick: function () {
    this.setState({ configure: false, test: false, present: true });
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
      var bottomOptions = (
        <ul className="bottomOptions-question-menu">
          <Link to="surveys" className="bottomOptions-edit-options confirm-question-save" onClick={ that.handleSaveClick }>Save</Link>
          <Link to={ "questions/" + that.state.questionId } className="bottomOptions-edit-options cancel-question-edit">Cancel</Link>
        </ul>
      );
    };

    var configureChecked = " configureChecked";
    var testChecked = " testChecked";
    var presentChecked = " presentChecked";

    var configureList = (
      <ul className="configured-list-items">
        <li>
          <div className="fa fa-caret-right" />
          How people can respond
        </li>
        <li>
          <div className="fa fa-caret-right" />
          Response settings
        </li>
        <li>
          <div className="fa fa-caret-right" />
          Schedule lock/unlock times
        </li>
      </ul>
    );

    var testList = (
      <ul className="test-list-items">
        <li>
          Web
          <div>
            The audience can respond to this poll at PollEv.com/peterlin502 as long as the poll is active.
          </div>
        </li>
        <li>
          Text message
        </li>
      </ul>
    );

    var presentList = (
      <ul className="configured-list-items">
        <li>
          <div className="fa fa-caret-right" />
          How to present
        </li>
        <li>
          <div className="fa fa-caret-right" />
          Share
        </li>
      </ul>
    );

    // Fill these out later.

    if (this.state.configure) {
      testList = "";
      testChecked = "";

      presentList = "";
      presentChecked = "";
    } else if (this.state.test) {
      configureList = "";
      configureChecked = "";

      presentList = "";
      presentChecked = "";
    } else {
      configureList = "";
      testChecked = "";

      testList = "";
      testChecked = "";
    }

    return (
      <div className="questionindexitem-toolbar">
        <ul className="topOptions-question-menu group">
          <li className={ "topOptions-options" + configureChecked + testChecked + presentChecked}
            onClick={ this.handleConfigureClick }>
            1. Configure
          </li>

          <li className={ "topOptions-options" + testChecked + presentChecked}
            onClick={ this.handleTestClick }>
            2. Test
          </li>

          <li className={ "topOptions-options" + presentChecked }
            onClick={ this.handlePresentClick }>
            3. Present
          </li>
        </ul>

        { configureList }

        { testList }

        { presentList }

        { bottomOptions }

      </div>
    )
  }
});

module.exports = QuestionIndexItemToolbar;
