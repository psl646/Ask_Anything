var React = require('react');
var ReactHighcharts = require('react-highcharts');
// actions
var ClientQuestionActions = require('../actions/client_question_actions');
// constants
var LettersNumbers = require('../constants/letters_numbers');
// stores
var QuestionStore = require('../stores/question_store')

var Graph = React.createClass({
  getInitialState: function (){
    var questionId = this.props.questionId;
    var myQuestion = QuestionStore.getQuestionById(questionId) || {};

    return ({
      questionId: questionId,
      question: myQuestion
    });
  },

  componentDidMount: function (){
    this.questionListener = QuestionStore.addListener(this._onChange);
    var location = window.location.hash.slice(0,11);

    ClientQuestionActions.getQuestionById(this.state.questionId, location);

    this.pusher = new Pusher('d7b6b378f3d562f7fd37', {
      encrypted: true
    });

    var channel = this.pusher.subscribe('question_' + this.state.questionId);
    channel.bind('response_recorded', function(data) {
      ClientQuestionActions.getQuestionById(this.state.questionId, location);
    }.bind(this));
  },

  componentWillUnmount: function (){
    this.questionListener.remove();
    this.pusher.unsubscribe('question_' + this.state.questionId);
  },

  _onChange: function () {
    var myQuestion = QuestionStore.getQuestionById(this.state.questionId);
    this.setState({ question: myQuestion });
  },

  getAnswers: function(){
    return this.state.question["answers"];
  },

  formatAnswerObjects: function (answerObjects){
    var alphabet = LettersNumbers.letters;
    var myAnswerArray = [];
    for (var i = 0; i < answerObjects.length; i++){
      var currentAnswer = alphabet[i].toUpperCase() + ") " + answerObjects[i]["answer"];
      myAnswerArray.push(currentAnswer);
    }
    return myAnswerArray;
  },

  getResponses: function(){
    return this.state.question["responses"];
  },

  formatResponseObjects: function (answerObjectsArray, responseObjectsArray){
    var myAnswersObject = {};
    for (var i =0; i < answerObjectsArray.length; i++){
      myAnswersObject[answerObjectsArray[i]["id"]] = 0;
    }
    for (var i =0; i < responseObjectsArray.length; i++){
      myAnswersObject[responseObjectsArray[i]["answer_id"]] += 1;
    }
    return Object.keys(myAnswersObject).map(function(answerId){
        return myAnswersObject[answerId];
    });
  },

  getChartData: function(){
    var answerObjectsArray = this.getAnswers();
    var formattedAnswersArray = answerObjectsArray ? this.formatAnswerObjects(answerObjectsArray) : [];
    var responseObjectsArray = this.getResponses();
    var formattedResponsesArray = this.formatResponseObjects(answerObjectsArray, responseObjectsArray);

    var config = {
      chart: {type: 'bar'},
      title: {text: this.state.question.question},
      xAxis: {categories: formattedAnswersArray},
      yAxis: {title: {text: ''}},
      series: [{
        name: "Total Recorded responses: " + responseObjectsArray.length,
        data: formattedResponsesArray
      }]
    };

    return React.createElement(ReactHighcharts, { config: config });
  },

  checkIfQuestionExist: function (){
    return (Object.keys(this.state.question).length !== 0);
  },

  render: function (){
    var currentChart = "";
    if (this.checkIfQuestionExist()){
      currentChart = this.getChartData()
    }

    return (
      <div>
        {currentChart}
      </div>
    )
  }
});

module.exports = Graph;
