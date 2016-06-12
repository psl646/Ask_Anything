var React = require('react');
var ClientQuestionActions = require('../actions/client_question_actions');
var QuestionStore = require('../stores/question_store');
var Link = require('react-router').Link;
// var SessionStore = require('../stores/session_store');
// var ClientSurveyActions = require('../actions/client_survey_actions');

var QuestionsIndex = React.createClass ({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return ({ questions: QuestionStore.all() });
  },

  componentDidMount: function () {
    this.questionListener = QuestionStore.addListener(this.questionStoreChange);
    ClientQuestionActions.fetchAllQuestions();
  },

  componentWillUnmount: function () {
    this.questionListener.remove();
  },

  questionStoreChange: function () {
    this.setState({ questions: QuestionStore.all() });
  },

  clickedOnEdit: function (outerHTMLArray) {
    if (outerHTMLArray.length > 1) {
      return (outerHTMLArray[1].slice(0,4) === "edit");
    } else {
      return false;
    };
  },

  clickedOnActive: function (outerHTMLArray){
    if (outerHTMLArray.length > 1) {
      return (outerHTMLArray[1].slice(0, 10) === "fa fa-wifi");
    } else {
      return false;
    };
  },

  clickedOnDeleteQuestion: function (outerHTMLArray) {
    if (outerHTMLArray.length > 3) {
      return (outerHTMLArray[3].slice(0,6) === "delete")
    } else {
      return false;
    };
  },

  handleClickOnQuestionItem: function (e) {
    e.preventDefault();
    var outerHTMLArray = e.target.outerHTML.split('"');

    var targetString = e.currentTarget.outerHTML;
    var questionId = targetString.split('"')[1];
    var url = "questions/" + questionId;

    if (outerHTMLArray.length <= 1){
      return false
    }

    if (this.clickedOnActive(outerHTMLArray)){
      ClientQuestionActions.toggleActive(parseInt(questionId));
    } else if (this.clickedOnDeleteQuestion(outerHTMLArray)) {
      ClientQuestionActions.deleteQuestion(questionId);
    } else {
      if (this.clickedOnEdit(outerHTMLArray)){
        url = url + "/edit";
      }
      this.context.router.push(url);
    }
  },

  render: function () {
    var that = this;
    var questions = this.state.questions;
    var mySurvey = this.props.survey;

    var questionsList = Object.keys(questions).map(function (question_id) {
      var activeQuestion = "nonactive-question";
      var activatedIcon = "nonactivated-icon";

      // Sorts questions into their surveys
      var currentQuestion = questions[question_id];
      if (currentQuestion["survey_id"] === parseInt(mySurvey.id)){
        if (currentQuestion["active"]) {
          activeQuestion = "active-question";
          activatedIcon = "activated-icon";
        };

        var displayQuestion = currentQuestion["question"];
        if (displayQuestion.length > 50) {
          displayQuestion = displayQuestion.slice(0, 47) + "...";
        }

        var responses = " Responses";

        if (currentQuestion["responses"].length === 1) {
          responses = " Response";
        }

        return (
          <li id={ question_id }
            key={ question_id }
            className={ "h13 group show-edit-delete " + activeQuestion }
            onClick={"li", that.handleClickOnQuestionItem }>

            <div className="current-question">{ displayQuestion }</div>

            <ul className="update-delete group">
              <li>
                <Link to={"/questions/" + question_id + "/edit"}
                  className="edit-question-link h11"> Edit </Link>
              </li>
              <li>
                <div id={ question_id }
                  className="delete-index-question h11"
                  onClick={ that.clickedOnDeleteQuestion }>Delete</div>
              </li>
              <div className={ "fa fa-wifi active-icon " + activatedIcon } id={ question_id } aria-hidden="true" />
              <div className="question-response-count soft-edges">
                { currentQuestion["responses"].length + responses }
              </div>
            </ul>
          </li>
        );
      }
    });

    return (
      <div className="question-index-list">
        { questionsList }
      </div>
    )
  }
});

module.exports = QuestionsIndex;
