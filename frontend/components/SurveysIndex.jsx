var React = require('react');
var ClientSurveyActions = require('../actions/client_survey_actions');
var SurveyStore = require('../stores/survey_store');

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
    var surveys = Object.keys(mySurveys).map(function(key){
      console.log("Current key: " + key);
      return <li className="surveysindex-li" key={ key }>{ mySurveys[key].title }</li>;
    }.bind(this));

    return (
      <div className="surveysindex-container">
        <ul >
          { surveys }
        </ul>
      </div>
    )
  }
});

module.exports = SurveysIndex;
