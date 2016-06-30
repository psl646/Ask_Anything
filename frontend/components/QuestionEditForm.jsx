var React = require('react');
var AnswerInput = require('./AnswerInput');
var QuestionStore = require('../stores/question_store');
var QuestionFormStore = require('../stores/question_form_store');
var QuestionFormActions = require('../actions/question_form_actions');
var ClientQuestionActions = require('../actions/client_question_actions');
var QuestionIndexItemToolbar = require('./QuestionIndexItemToolbar');

var QuestionEditForm = React.createClass({
  getInitialState: function () {
    var questionId = parseInt(window.location.hash.split("?")[0].split("questions")[1].split("/")[1]);

    return ({
      input: "",
      questionId: questionId,
      newQuestion: "",
      newCategory: "",
      oldAnswers: {},
      answers: {},
      answerId: 1,
      answerFormObjects: {}
     });
  },

  myQuestionFormData: function () {
    return ({
      question: this.state.newQuestion,
      category: this.state.newCategory,
      oldAnswers: this.state.oldAnswers,
      answers: this.state.answers
    });
  },

  sendQuestionFormData: function () {
    var questionFormData = this.myQuestionFormData();
    window.setTimeout(function() {
      QuestionFormActions.sendQuestionFormData(this.state.questionId, questionFormData);
    }.bind(this), 0);
  },

  componentDidMount: function () {
    this.questionFormListener = QuestionStore.addListener(this._onChange);
    this.QuestionFormStore = QuestionFormStore.addListener(this._formStoreChange);
    var location = window.location.hash.slice(0,11);
    ClientQuestionActions.getQuestionById(this.state.questionId, location);
  },

  componentWillUnmount: function () {
    this.questionFormListener.remove();
    this.QuestionFormStore.remove();
    QuestionFormActions.clearQuestionForms();
  },

  _onChange: function () {
    var myQuestion = QuestionStore.getQuestionById(this.state.questionId);
    var question = myQuestion || {};
    var oldAnswers = {};

    question["answers"].forEach(function(answerObj){
      oldAnswers[answerObj.id] = answerObj.answer;
    });

    this.state.newQuestion =  question.question;
    this.state.newCategory = question.category;
    this.state.oldAnswers = oldAnswers;

    this.sendQuestionFormData();
  },

  _formStoreChange: function () {
    var myQuestion = QuestionFormStore.getQuestionFormById(this.state.questionId);
    var oldAnswerFormObjects = this._getOldAnswers();

    this.setState ({
      newQuestion: myQuestion.question,
      newCategory: myQuestion.category,
      oldAnswers: myQuestion.oldAnswers,
      answers: myQuestion.answers,
      answerFormObjects: oldAnswerFormObjects
    });
  },

  _getOldAnswers: function () {
    var myAnswers = QuestionFormStore.getAllAnswers(this.state.questionId);
    var currentAnswerKeys = Object.keys(myAnswers);
    var oldAnswerFormObjects = this.state.answerFormObjects;

    Object.keys(oldAnswerFormObjects).forEach(function(answerKey){
      if (!currentAnswerKeys.includes(answerKey)) {
        delete oldAnswerFormObjects[answerKey];
      }
    });

    return oldAnswerFormObjects;
  },

  questionChange: function (e) {
    var newQuestion = e.target.value;
    this.state.newQuestion = newQuestion;
    this.setState({ newQuestion: newQuestion });
    this.sendQuestionFormData();
  },

  answerChange: function (e) {
    var outerHTMLAnswer = e.target.outerHTML.split('"');
    if (outerHTMLAnswer.includes("old")) {
      this.state.oldAnswers[outerHTMLAnswer[7]] = e.target.value;
      this.sendQuestionFormData();
    };
  },

  createNewAnswer: function(e) {
    var newAnswerValue = e.target.value;
    var answerId = this.state.answerId;

    var newAnswer = <AnswerInput
        questionId={ this.state.questionId }
        answerId={ this.state.answerId }
        answer={ newAnswerValue } />;

    this.state.answerFormObjects[answerId] = newAnswer;
    this.setState({ answerId: answerId + 1, input: "" });
  },

  deleteAnswer: function (e) {
    var outerHTML = e.target.outerHTML;
    var answerId = outerHTML.split('"')[1];
    if (parseInt(answerId).toString() !== answerId) {
      answerId = outerHTML.slice(outerHTML.indexOf('id="') + 4).split('"')[0];
    }
    QuestionFormActions.deleteAnswerToQuestion(this.state.questionId, parseInt(answerId));
  },

  myOldAnswers: function () {
    var myOldAnswersList = "";
    var oldAnswerKeys = Object.keys(this.state.oldAnswers);
    if (oldAnswerKeys.length !== 0) {
      myOldAnswersList = this.showMyOldAnswers(oldAnswerKeys);
    }
    return myOldAnswersList;
  },

  showMyOldAnswers: function(oldAnswerKeys) {
    return oldAnswerKeys.map(function (answerId) {
      return (
        <li key={ answerId } className="edit-question-answer-input-container">
          <input
            className="edit-question-answer-input"
            name="old" id={ answerId } type="string"
            value={ this.state.oldAnswers[answerId] }
            onChange={ this.answerChange } />
          <div id={ answerId }
            className="soft-edges delete-answer-edit-form hover-pointer"
            onClick={"li", this.deleteAnswer }>X</div>
        </li>
      );
    }.bind(this));
  },

  myNewAnswers: function () {
    return Object.keys(this.state.answerFormObjects).map(function(answerId){
      return (
        <li key={ answerId } >
          { this.state.answerFormObjects[answerId] }
        </li>
      );
    }.bind(this));
  },

  editQuestionField: function () {
    return (
      <input
        className="question-edit-question"
        type="string"
        value={ this.state.newQuestion }
        onChange={ this.questionChange }
        />
    );
  },

  allMyAnswers: function () {
    return (
      <ul>
        { this.myOldAnswers() }
        { this.myNewAnswers() }
      </ul>
    );
  },

  addAnswerField: function () {
    return (
      <div className="edit-question-add-answer-field">
        <input
          className="edit-question-answer-input"
          type="string"
          value={ this.state.input }
          placeholder="Type or upload an image to use as choice"
          onChange={ this.createNewAnswer }
          />
      </div>
    );
  },

	render: function () {
    return (
      <div className="questionindexitem-container group">
        <QuestionIndexItemToolbar />
        <div className="question-graph-container">
          { this.editQuestionField() }
          { this.allMyAnswers() }
          { this.addAnswerField() }
        </div>
      </div>
    );
	}
});

module.exports = QuestionEditForm;
