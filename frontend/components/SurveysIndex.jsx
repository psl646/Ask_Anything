var React = require('react');
var ClientSurveyActions = require('../actions/client_survey_actions');
var SurveyStore = require('../stores/survey_store');
var QuestionStore = require('../stores/question_store');
var SideNav = require('./SideNav');
var QuestionsIndex = require('./QuestionsIndex');
var ErrorActions = require('../actions/error_actions');

var SurveysIndex = React.createClass ({

  getInitialState: function () {
    return ({ surveys: {}, clickedSurveys: {} });
  },

  setSurveys: function () {
    var potentialSurveys = SurveyStore.all();
    var surveys = potentialSurveys || {};
    var clickedSurveys = this.state.clickedSurveys;

    Object.keys(surveys).forEach(function(surveyId){
      if ( clickedSurveys[surveyId] === undefined ) {
        clickedSurveys[surveyId] = false;
      };
    });

    this.setState({ surveys: surveys, clickedSurveys: clickedSurveys });
  },

  _questionChange: function () {
    ClientSurveyActions.fetchAllSurveys();

    window.setTimeout(function() {
      if (window.location.hash.slice(2,9).toLowerCase() === "surveys") {
        this.setSurveys();
      }
    }.bind(this), 300);
  },

  componentDidMount: function () {
    window.setTimeout(function () {
      ErrorActions.clearErrors();
    }, 0 );
    this.questionListener = QuestionStore.addListener(this._questionChange);
    ClientSurveyActions.fetchAllSurveys();

    window.setTimeout(function() {
      this.setSurveys();
    }.bind(this), 200);
  },

  componentWillUnmount: function () {
    this.questionListener.remove();
  },

  clickedSurveyLi: function (e) {
    var surveyId = e.currentTarget.innerHTML.slice(9).split('"')[0];

    if ((!this.clickedActivateToggle(e)) && (!this.clickedDeleteQuestion(e))){
      this.toggleShowSurveyItems(surveyId);
    };
  },

  clickedActivateToggle: function (e) {
    var outerHTMLArray = e.target.outerHTML.split('"');

    if (outerHTMLArray.length > 1) {
      return (outerHTMLArray[1].slice(0, 10) === "fa fa-wifi");
    } else {
      return false;
    };
  },

  clickedDeleteQuestion: function (e) {
    var outerHTMLArray = e.target.outerHTML.split('"');

    if (outerHTMLArray.length > 3) {
      return (outerHTMLArray[3].slice(0,6) === "delete");
    } else {
      return false;
    }
  },

  toggleShowSurveyItems: function (surveyId) {

    var clickedSurveys = this.state.clickedSurveys;

    if (clickedSurveys[surveyId]) {
      clickedSurveys[surveyId] = false
      this.setState({ clickedSurveys: clickedSurveys });
    } else {
      clickedSurveys[surveyId] = true
      this.setState({ clickedSurveys: clickedSurveys });
    }
  },

  render: function () {
    var that = this;
    var mySurveys = this.state.surveys;

    var surveys = Object.keys(mySurveys).map(function(survey_id){
      var toggleSurvey = ""
      var caretIcon = "fa fa-caret-down";

      if (that.state.clickedSurveys[survey_id]) {
        toggleSurvey = "clicked_survey_li";
        caretIcon = "fa fa-caret-right";
      }

      var currentSurvey = mySurveys[survey_id];
      var numberQuestions = "Questions";

      if (currentSurvey["question_count"] === 1) {
        numberQuestions = "Question";
      }

      return (
        <li className="surveysindex-li hover-pointer" key={ survey_id } onClick={"li", that.clickedSurveyLi }>
          <div id={ survey_id } className="h14">
            <div className={ "caret-icon " + caretIcon } />
            <div>
              { currentSurvey.title }
            </div>
            <div className="question-count h11">
              { currentSurvey.question_count + " " + numberQuestions }
            </div>
          </div>
          <ul className={ "survey-index-items " + toggleSurvey }>
            <QuestionsIndex survey={ currentSurvey }/>
          </ul>
        </li>
      );
    });

    if (Object.keys(mySurveys).length === 0) {
      surveys = "";
    }


    return (
      <div className="surveysindex-container group">
        <SideNav />
        <ul className="surveysindex-ul">
          { surveys }
        </ul>
      </div>
    );
  }
});

module.exports = SurveysIndex;
