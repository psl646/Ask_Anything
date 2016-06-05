var React = require('react');
var ClientQuestionActions = require('../actions/client_question_actions');
var ClientSurveyActions = require('../actions/client_survey_actions');
var QuestionStore = require('../stores/question_store');
var ErrorStore = require('../stores/error_store');
var ErrorActions = require('../actions/error_actions');
var QuestionForm = require('./QuestionForm');

var QuestionFormGenerator = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return ({
      title: "",
      numberQuestions: 0,
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

    if (this.state.isSurvey) {
      formData.title = this.state.title;
      ClientSurveyActions.createSurvey(formData);
    } else {
      ClientQuestionActions.createQuestions(formData);
    }
  },

  handleQuestionInputChange: function (e) {
    var newQuestionValue = e.target.value;
    var newQuestion = <QuestionForm question={ newQuestionValue }/>
    console.log(newQuestion);
    this.setState({
      questions: this.state.questions.concat( newQuestion ),
      numberQuestions: this.state.numberQuestions + 1
    })
  },

  handleSurveyTitleChange: function (e) {
    var newSurveyTitle = e.target.value;
    this.setState({ title: newSurveyTitle });
  },

	render: function () {
    var addQuestion = "Question:";
    var myNewQuestions = "";
    var surveyText = "";
    var createText = "Create";
    var surveyInput = "";

    console.log(this.state.questions);
    if (this.state.numberQuestions !== 0) {
      console.log(this.state.questions);
      addQuestion = "Add a question:"
      myNewQuestions = this.state.questions.map(function(currentQuestion, idx){
        return (
          <li key={ idx }>
            { currentQuestion }
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

    return (
      <div>
        <form onSubmit={ this.handleSubmit } >
          <label>
            { addQuestion }

            { surveyText }

            { surveyInput }

            <ul>
              { myNewQuestions }
            </ul>

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
