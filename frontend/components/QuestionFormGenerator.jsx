var React = require('react');
var ClientQuestionActions = require('../actions/client_question_actions');
var ClientSurveyActions = require('../actions/client_survey_actions');
var QuestionStore = require('../stores/question_store');
var ErrorStore = require('../stores/error_store');
var ErrorActions = require('../actions/error_actions');
var QuestionForm = require('./QuestionForm');
var QuestionFormStore = require('../stores/question_form_store');
var QuestionFormActions = require('../actions/question_form_actions');

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
  },

  componentWillUnmount: function () {
    window.setTimeout(function(){
      ErrorActions.clearErrors();
    }, 0);

    // Can possibly revamp this so that we can persist state for un-saved/sent questions
    window.setTimeout(function(){
      QuestionFormActions.clearQuestionForms();
    }, 0);

    this.errorListener.remove();
    this.questionListener.remove();
    this.questionFormListener.remove();
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
    this.closeMyself();
    window.setTimeout(function(){
      QuestionFormActions.clearQuestionForms();
    }, 0);
    var question = QuestionStore.getNewQuestion();
    this.context.router.push("questions/" + question.id);
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

    // this.setState({ errors: false });
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
          Include a question mark or colon, then type your multiple choice answers separated by commas.  Hit RETURN and we'll split stuff out automatically.
        </li>

        <li>
          Example:
          <div>
            <div>What's your favorite color?</div>
            <div className="red text-inline">Red</div>, &nbsp;
            <div className="blue text-inline">Blue</div>, or &nbsp;
            <div className="green text-inline">Green</div>
          </div>
        </li>

        <li className="h14">
          Importing a bunch of questions?
        </li>

        <li>
          Copy & paste a list of questions and we'll create a question for each line.
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
              <div className="protip-only">ProTip</div>
              <div className="TM-only">TM</div>
            </div>
            <label className="add-question h12">{ addQuestion }
              <input
                className="question-input-field margin-auto placeholder-text h22"
                type="text"
                value={ this.state.input }
                placeholder="What's your favorite color? Red, Blue, or Green"
                onChange={ this.handleQuestionInputChange }
                />
            </label>
          </div>

          <div
            className="cancel-forgot hover-underline display-inline hover-pointer cancel-question-form"
            onClick={ this.closeMyself }>
            Cancel
          </div>
          <input className="soft-edges hover-pointer question-creation-button" type="submit" value={ createText } />
          <div>
            <i className="fa fa-arrow-right small-arrow" aria-hidden="true"></i>
          </div>
        </form>
      </div>
		);
	}
});

module.exports = QuestionFormGenerator;
