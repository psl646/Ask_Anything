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
      input: "",
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
    console.log(e);

    console.log(this.state.questions)

    // var formData = {
    //   questions:
    // };

    // console.log(formData);
    // console.log(this.state.isSurvey);
    // if (this.state.isSurvey) {
    //   formData.title = this.state.title;
    //   ClientSurveyActions.createSurvey(formData);
    // } else {
    //   "You hit ClientQuestionActions ELSE"
    //   ClientQuestionActions.createQuestions(formData);
    // }
  },

  handleQuestionInputChange: function (e) {
    var newQuestionValue = e.target.value;

    var newQuestion = <QuestionForm
      form="questionform"
      key={ this.state.numberQuestions }
      question={ newQuestionValue }
      />

    this.setState({
      questions: this.state.questions.concat( newQuestion ),
      numberQuestions: this.state.numberQuestions + 1,
      input: ""
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

    if (this.state.numberQuestions !== 0) {
      addQuestion = "Add a question:"
      myNewQuestions = this.state.questions.map(function(currentQuestion, idx){
        console.log(currentQuestion);
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
        <form id="questionform" onSubmit={ this.handleSubmit } >
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
        </form>
      </div>
		);
	}
});

module.exports = QuestionFormGenerator;
