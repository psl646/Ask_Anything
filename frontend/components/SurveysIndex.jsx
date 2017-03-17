var React = require('react');
var ClientSurveyActions = require('../actions/client_survey_actions');
var SurveyStore = require('../stores/survey_store');
var QuestionStore = require('../stores/question_store');
var SideNav = require('./SideNav');
var QuestionsIndex = require('./QuestionsIndex');
var ErrorActions = require('../actions/error_actions');
var ServerSurveyActions = require('../actions/server_survey_actions');

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
    }.bind(this), 500);
  },

  componentDidMount: function () {
    window.setTimeout(function () {
      ErrorActions.clearErrors();
    }, 0 );

    this.questionListener = QuestionStore.addListener(this._questionChange);
    ClientSurveyActions.fetchAllSurveys();

    window.setTimeout(function() {
      this.setSurveys();
    }.bind(this), 333);
  },

  componentWillUnmount: function () {
    this.questionListener.remove();
    ServerSurveyActions.clearSurveys();
  },

  clickedSurveyLi: function (e) {
    var outerHTML = e.currentTarget.outerHTML;
    var surveyId = outerHTML.slice(outerHTML.indexOf('id') + 4).split('"')[0];
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

  mySurveys: function () {
    var that = this;
    var allSurveys = this.state.surveys;

    var surveys = Object.keys(allSurveys).map(function(survey_id){
      var toggleSurvey = ""
      var caretIcon = "fa fa-caret-down";

      if (that.state.clickedSurveys[survey_id]) {
        toggleSurvey = "clicked_survey_li";
        caretIcon = "fa fa-caret-right";
      }

      var currentSurvey = allSurveys[survey_id];
      var numberQuestions = "Questions";

      if (currentSurvey["question_count"] === 1) {
        numberQuestions = "Question";
      }

      return (
        <li className="lead surveysindex-li hover-pointer" key={ survey_id }>
          <div id={ survey_id } className="h14" onClick={"div", that.clickedSurveyLi }>
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

    return surveys;
  },

  surveysIsNotEmpty: function () {
    return (Object.keys(this.state.surveys).length !== 0);
  },

  render: function () {
    var surveys = "";

    if (this.surveysIsNotEmpty()) {
      surveys = this.mySurveys();
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
