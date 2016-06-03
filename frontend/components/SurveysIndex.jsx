var React = require('react');
var ClientSurveyActions = require('../actions/client_survey_actions');
var SurveyStore = require('../stores/survey_store');
var SideNav = require('./SideNav');
var QuestionsIndex = require('./QuestionsIndex');


var SurveysIndex = React.createClass ({
  getInitialState: function () {
    return ({ surveys: SurveyStore.all() });
  },

  componentDidMount: function () {
    this.surveyListener = SurveyStore.addListener(this._onChange);
    ClientSurveyActions.fetchAllSurveys();
  },

  componentWillUnmount: function () {
    this.surveyListener.remove();
  },

  _onChange: function () {
    this.setState({ surveys: SurveyStore.all() });
  },

  render: function () {
    var mySurveys = this.state.surveys;

    var surveys = Object.keys(mySurveys).map(function(survey_id){
      var currentSurvey = mySurveys[survey_id];
      return (
        <li className="surveysindex-li" key={ survey_id }>{ currentSurvey.title }
          <ul className="survey-index-items">
            <QuestionsIndex survey={ currentSurvey }/>
          </ul>
        </li>
      );
    }.bind(this));

    return (
      <div className="surveysindex-container group">
        <SideNav />
        <ul className="surveysindex-ul">
          { surveys }
        </ul>
      </div>
    )
  }
});

module.exports = SurveysIndex;
