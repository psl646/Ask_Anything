var React = require('react');
var ClientQuestionActions = require('../actions/client_question_actions');
var ClientSurveyActions = require('../actions/client_survey_actions');
var QuestionStore = require('../stores/question_store');
var ErrorStore = require('../stores/error_store');
var ErrorActions = require('../actions/error_actions');

var QuestionFormGenerator = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return ({
      title: "",
      questions: [],
      currentQuestion: "",
      isSurvey: false,
      errors: false
    });
  },

  componentDidMount: function () {
    this.errorListener = ErrorStore.addListener(this._handleErrors);
    this.questionListener = QuestionStore.addListener(this._questionsCreated);
  },

  componentWillUnmount: function () {
    ErrorActions.clearErrors();
    this.errorListener.remove();
    this.questionListener.remove();
  },

  closeMyself: function () {
    this.props.closeThisModal();
  },

  _handleErrors: function () {
    this.setState({ questions: [], errors: true });
  },

  _questionsCreated: function () {
    this.closeMyself();
    var question = QuestionStore.getNewQuestion();
    this.context.router.push("questions/" + question.id);
  },

  handleSubmit: function (e) {
    e.preventDefault();

    var formData = {
      questions: this.state.questions
    };

    console.log(formData);

    // if (this.state.isSurvey) {
    //   formData.title = this.state.title;
    //   ClientSurveyActions.createSurvey(formData);
    // } else {
    //   ClientQuestionActions.createQuestions(formData);
    // }
  },

  handleQuestionInputChange: function (e) {
    var newQuestion = e.target.value;
    console.log(newQuestion);
    // this.setState({ this.state.currentQuestion });
  },

  handleSurveyTitleChange: function (e) {
    var newSurveyTitle = e.target.value;
    this.setState({ this.state.title: newSurveyTitle });
  },

	render: function () {
    var addQuestion = "Question:";
    var myNewQuestions = "";
    var surveyText = "";
    var createText = "Create";
    var surveyInput = "";

    if (this.state.questions.length !== 0) {
      addQuestion = "Add a question:"
    }

    if (this.state.isSurvey) {
      surveyText = "Combine multiple questions into a survey. Send the link to participants, and they can answer on a mobile-friendly response page, at their own pace."
      createText = "Create survey"
      surveyInput = <label> Title: <br/>
                      type="text"
                      placeholder="Survey title"
                      onChange={ this.handleSurveyTitleChange }
                    </label>
    }

    return (
      <div>
        <form onSubmit={ this.handleSubmit } >
          <label>
            { addQuestion }

            { surveyText }

            { surveyInput }

            { myNewQuestions }

            <input
              className=""
              type="text"
              placeholder="What's your favorite color? Red, Blue, or Green"
              onChange={ this.handleQuestionInputChange }
              />
          </label>
          <div className="cancel-forgot hover-underline display-inline hover-pointer" onClick={ this.closeMyself }>
            Cancel
          </div>
          <input className="soft-edges hover-pointer" type="submit" value={ createText } />
        </form>
      </div>
		);
	}
});

module.exports = QuestionFormGenerator;
