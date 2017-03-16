var React = require('react');
var Link = require('react-router').Link;
var Modal = require('react-modal');
var ModalConstants = require('../constants/modal_constants');
var QuestionStore = require('../stores/question_store');
var DeleteQuestion = require('./DeleteQuestion');
var ClientQuestionActions = require('../actions/client_question_actions');
var SessionStore = require('../stores/session_store');
var QuestionFormStore = require('../stores/question_form_store');
var ErrorStore = require('../stores/error_store');

var QuestionIndexItemToolbar = React.createClass ({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    var user = SessionStore.currentUser();
    var questionId = parseInt(window.location.hash.split("?")[0].split("questions")[1].split("/")[1]);

    return ({
      user: user,
      questionId: questionId,
      question: {},
      modalOpen: false,
      configure: true,
      test: false,
      present: false,
      newQuestion: "",
      newCategory: "",
      newAnswers: {},
      oldAnswers: {}
    });
  },

  componentDidMount: function () {
    this.questionStoreListener = QuestionStore.addListener(this._onChange);
    this.questionFormListener = QuestionFormStore.addListener(this._handleQuestionFormChange);
    this.errorListener = ErrorStore.addListener(this._errorChange);
  },

  componentWillUnmount: function () {
    this.questionStoreListener.remove();
    this.questionFormListener.remove();
    this.errorListener.remove();
  },

  _onChange: function () {
    var myQuestion = QuestionStore.getQuestionById(this.state.questionId);
    var question = myQuestion || {};
    this.setState ({ question: question });
  },

  _errorChange: function () {
    alert("An error occured while trying to update, try again.");
  },

  _handleQuestionFormChange: function () {
    var myQuestion = QuestionFormStore.getQuestionFormById(this.state.questionId);

    if (myQuestion !== undefined) {
      this.setState ({
        newQuestion: myQuestion.question,
        newCategory: myQuestion.category,
        newAnswers: myQuestion.answers,
        oldAnswers: myQuestion.oldAnswers
      });
    }
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

    var formData = {
      questionId: this.state.questionId,
      question: this.state.newQuestion,
      category: this.state.newCategory,
      answers: this.state.newAnswers,
      oldAnswers: this.state.oldAnswers
    };

    ClientQuestionActions.updateQuestion(formData);

    window.setTimeout(function () {
      var errors = ErrorStore.getErrors();
      if (errors.length === 0) {
        this.context.router.push("questions/" + this.state.questionId);
      }
    }.bind(this), 0);
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
        <div className="bottomOptions-options">Export</div>
        <Link to="surveys" className="bottomOptions-options" onClick={ that.handleDeleteClick } >Delete
          <Modal
            isOpen={ that.state.modalOpen }
            onRequestClose={ that.closeModal }
            style={ ModalConstants.DELETE_QUESTION }>

              <DeleteQuestion question={ that.state.question.question } questionId={ that.state.questionId } closeThisModal={ that.closeModal } />

          </Modal>
        </Link>
      </ul>
    );

    if (this.isEditPage()) {
      var bottomOptions = (
        <ul className="bottomOptions-question-menu">
          <Link to="surveys" className="bottomOptions-edit-options confirm-question-save" onClick={ that.handleSaveClick }>Save</Link>
          <Link to={ "questions/" + that.state.questionId } className="bottomOptions-edit-options cancel-question-edit">Cancel</Link>
        </ul>
      );
    }

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

    var url = window.location.href;
    var hostNameArray = url.split("#")[0].split('/');
    var hostName = hostNameArray[hostNameArray.length - 2];
    var username = this.state.user.username;

    var testList = (
      <ul className="test-list-items group">
        <div className="test-list-items-message">
          The audience can respond<br />
          to this question at<br />
          <Link to={ "/" + username } className="hover-pointer highlight-pointer">{ hostName }/#/{ username }</Link><br />
          as long as the question is active<br />
          OR<br />
          text { that.state.questionId } with your answer to <br />
          914-292-3261
        </div>
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

    var phoneImage = (
      <div>
        <img className="phone-image" src={ window.askAnythingAssets.phone } width="250" height="450" alt="Phone" />
        <div className="sms-answer">
          {that.state.questionId} A
        </div>
      </div>
    );

    if (this.state.test || this.state.question.active) {
      configureList = "";
      configureChecked = "";

      presentList = "";
      presentChecked = "";
    } else if (this.state.configure) {
      testList = "";
      testChecked = "";
      phoneImage = ""

      presentList = "";
      presentChecked = "";
    } else {
      configureList = "";
      configureChecked = "";
      phoneImage = "";

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
        {testList}
        {phoneImage}
        { bottomOptions }
      </div>
    )
  }
});

module.exports = QuestionIndexItemToolbar;
