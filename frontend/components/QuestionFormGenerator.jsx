var React = require('react');
var ClientQuestionActions = require('../actions/client_question_actions');
var ClientSurveyActions = require('../actions/client_survey_actions');
var QuestionStore = require('../stores/question_store');
var ErrorStore = require('../stores/error_store');
var ErrorActions = require('../actions/error_actions');
var QuestionForm = require('./QuestionForm');
var QuestionFormStore = require('../stores/question_form_store');
var QuestionFormActions = require('../actions/question_form_actions');
var SessionStore = require('../stores/session_store.js');

var QuestionFormGenerator = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  getInitialState: function () {
    var myQuestions = QuestionFormStore.getAllQuestions();
    var questionsFormData = myQuestions || {};

    return ({
      input: "",
      title: "",
      questionId: 1,
      questionsFormData: questionsFormData,
      questionFormObjects: {},
      isSurvey: false,
      errors: false
    });
  },

  componentDidMount: function () {
    this.errorListener = ErrorStore.addListener(this._handleErrors);
    this.questionListener = QuestionStore.addListener(this._questionsCreated);
    this.questionFormListener = QuestionFormStore.addListener(this.updateQuestions)
    var currentUser = SessionStore.currentUser();

    if (currentUser["tour"] === "true" && window.localStorage["tourPart"] === "one"){
      this.handleTour();
    }
  },

  handleTour: function(){
    var intro = introJs();
    intro.setOptions({
      showStepNumbers: false,
      steps:[
        {
          intro: "This is the form we use to create a question."
        },
        {
          element: document.getElementById("introjs-question-input-box"),
          intro: "Type in your question here."
        },
        {
          element: document.getElementById("introjs-question-create-button"),
          intro: "When you are all done with your question, click here!",
          position: "right"
        },
        {
          element: document.getElementById("introjs-protip"),
          intro: "Hover over our ProTip to learn a new way to quickly create a question.",
          position: "right"
        },
        {
          intro: "Try creating a question now!"
        }
      ]
    })
    intro.start();
    window.setTimeout(function(){
      window.localStorage["tourPart"] = "two";
    }, 0);
  },

  componentWillUnmount: function () {
    this.errorListener.remove();
    this.questionListener.remove();
    this.questionFormListener.remove();

    window.setTimeout(function(){
      ErrorActions.clearErrors();
    }, 0);

    window.setTimeout(function(){
      QuestionFormActions.clearQuestionForms();
    }, 0);

  },

  updateQuestions: function () {
    var myQuestions = QuestionFormStore.getAllQuestions();
    var questionsFormData = myQuestions || {};

    var currentQuestionFormDataKeys = Object.keys(questionsFormData);

    var oldQuestionFormObjects = this.state.questionFormObjects;

    Object.keys(oldQuestionFormObjects).forEach(function(questionId){
      if (!currentQuestionFormDataKeys.includes(questionId)) {
        delete oldQuestionFormObjects[questionId];
      }
    });

    this.setState({
      questionsFormData: questionsFormData,
      questionFormObjects: oldQuestionFormObjects
    });
  },

  closeMyself: function () {
    this.props.closeThisModal();
  },

  _handleErrors: function () {
    this.setState({ errors: true });
  },

  _questionsCreated: function () {
    var that = this;
    that.closeMyself();
    window.setTimeout(function(){
      QuestionFormActions.clearQuestionForms();
    }, 0);
    window.setTimeout(function() {
      var question = QuestionStore.getNewQuestion();
      that.context.router.push("questions/" + question.id);
    });
  },

  handleSubmit: function (e) {
    e.preventDefault();

    var questions = Object.keys(this.state.questionsFormData).map(function(questionId){
      return this.state.questionsFormData[questionId];
    }.bind(this));

    var formData = {
      questions: questions
    };

    if (this.state.isSurvey) {
      formData["title"] = this.state.title;
      ClientSurveyActions.createSurvey(formData);
    } else {
      ClientQuestionActions.createQuestions(formData);
    }
  },

  handleQuestionInputChange: function (e) {
    var newQuestionValue = e.target.value;
    var questionId = this.state.questionId;

    var newQuestion = <QuestionForm
      questionId={ questionId }
      question={ newQuestionValue }
      />;

    this.state.questionFormObjects[questionId]= newQuestion;

    this.setState({ questionId: questionId + 1, input: "" });
  },

  handleSurveyTitleChange: function (e) {
    var newSurveyTitle = e.target.value;
    this.setState({ title: newSurveyTitle });
  },

  checkKeyPressed: function (e) {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  },

	render: function () {
    var addQuestion = "Question:";
    var myNewQuestions = [];
    var surveyText = "";
    var createText = "Create";
    var surveyInput = "";
    var that = this;

    if (that.state.questionId !== 1) {
      addQuestion = "Add a question:"
      myNewQuestions = Object.keys(that.state.questionFormObjects).map(function(questionId){
        return (
          <li key={ questionId }>
            { that.state.questionFormObjects[questionId] }
          </li>
        );
      });
    }


    if (this.state.isSurvey) {
      surveyText = "Combine multiple questions into a survey. Send the link to participants, and they can answer on a mobile-friendly response page, at their own pace."
      createText = "Create survey"
      surveyInput = <label> Title: <br/>
                      type="text"
                      placeholder="Survey title"
                      onChange={ this.handleSurveyTitleChange }
                    </label>
    };

    var popUpProTip = (
      <ul className="protip-popup h12 soft-edges">
        <li className="h14">
          Want to make a quick Multiple Choice Question?
        </li>

        <li>
          Include a question mark, then type your multiple choice answers separated by commas.  Hit RETURN and we'll split stuff out automatically.
        </li>

        <li>
          Example:
          <div>
            <div>What's your favorite color?</div>
            <div className="red text-inline">Red</div>, &nbsp;
            <div className="blue text-inline">Blue</div>, &nbsp;
            <div className="green text-inline">Green</div>
          </div>
        </li>
      </ul>
    );

    return (
      <div>
        <form onSubmit={ this.handleSubmit } >
          { surveyText }

          { surveyInput }

          <ul>
            { myNewQuestions }
          </ul>

          <div className="question-form-generator-container soft-edges">
            <div className="protip-custom">
              { popUpProTip }
              <div id="introjs-protip" className="protip-only">ProTip</div>
              <div className="TM-only">TM</div>
            </div>
            <label className="add-question h12">{ addQuestion }
              <input
                id="introjs-question-input-box"
                className="question-input-field margin-auto placeholder-text h22"
                type="text"
                value={ this.state.input }
                placeholder="What's your favorite color? Red, Blue, Green"
                onKeyDown={ this.checkKeyPressed }
                onChange={ this.handleQuestionInputChange }
                />
            </label>
          </div>

          <div
            className="cancel-forgot hover-underline display-inline hover-pointer cancel-question-form"
            onClick={ this.closeMyself }>
            Cancel
          </div>
          <input id="introjs-question-create-button" className="soft-edges hover-pointer question-creation-button" type="submit" value={ createText } />
        </form>
      </div>
		);
	}
});

module.exports = QuestionFormGenerator;
