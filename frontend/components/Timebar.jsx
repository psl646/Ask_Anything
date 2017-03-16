var React = require('react');
// constants
var TimeConstants = require('../constants/time_constants');

var Timebar = React.createClass({
  getInitialState: function (){
    return ({
      time: "0000",
      timeBegin: 0,
      timeLeft: 0
    });
  },

  componentDidMount: function (){
  },

  componentWillUnmount: function (){
    if (this.timeCounter !== undefined) {
      window.clearInterval(this.timeCounter);
    }
  },

  _onChange: function () {
  },

  handleTimerClick: function () {
    if (this.state.timeLeft === 0){
      var convertedTime = this.convertTimeToMilliseconds();
      this.setState({ time: "0000", timeBegin: convertedTime, timeLeft: convertedTime });
      window.setTimeout(function(){
        ClientQuestionActions.toggleActive(this.state.questionId);
      }.bind(this), convertedTime)
    }
  },

  timerChange: function (e) {
    if (this.state.timeLeft === 0){
      var input = parseInt((e.target.value).slice(5));
      var myTime = this.state.time;

      if (TimeConstants.ACCEPTABLE_VALUES.includes(input)){
        var myTime = myTime.slice(1) + input;
      }

      this.setState({ time: myTime });
    }
  },

  convertTimeToMilliseconds: function () {
    var myTime = this.state.time;
    var minutes = parseInt(myTime.slice(0, 2));
    var seconds = parseInt(myTime.slice(2, 4));

    var minutes = minutes * 60;

    return (minutes + seconds) * 1000;
  },

  getTimePercentage: function () {
    var percentage;
    if (this.state.timeLeft === 0) {
      if (this.timeCounter !== undefined){
        window.clearInterval(this.timeCounter);
        this.timeCounter = undefined;
        this.state.timeBegin = 0;
      }
      return 0;
    } else {
      percentage = 100 * (this.state.timeLeft / this.state.timeBegin);
    }

    if (this.timeCounter === undefined) {
      this.timeCounter = window.setInterval(function(){
        this.setState({timeLeft: this.state.timeLeft - 10})
      }.bind(this), 10);
    }

    return percentage;
  },

  getColor: function(percentage){
    if (percentage > 67){
      return "green";
    } else if (percentage > 34){
      return "yellow";
    } else {
      return "red";
    }
  },

  getTimebarStyle: function(percentage, color){
    return ({
      width: percentage + "%",
      height: "100%",
      background: color
    });
  },

  render: function (){
    var percentage = this.getTimePercentage();
    var color = this.getColor(percentage);
    var timeBarStyle = this.getTimebarStyle(percentage, color);


    var myTime = that.state.time;
    var time = myTime.slice(0,2) + ":" + myTime.slice(2,4);

    var percentage = this.getTimePercentage();
    var color = this.getColor(percentage);
    var countdownTimeBar = {
      width: percentage + "%",
      height: "100%",
      background: color
    };


    var timeLi = (
      <li className="question-timer-input group soft-edges">
        <input
          className="time-input-field soft-edges hover-text"
          type="text"
          value={ time }
          onChange={ this.timerChange }
          />

        <div
          className="fa fa-clock-o clock-icon hover-pointer"
          aria-hidden="true"
          onClick={ this.handleTimerClick }
        />
      </li>
    );

    return (
      <div>
        <ul className="question-index-item-timer group">
          <img
            className="logo-image"
            src={window.askAnythingAssets.logo}
            width="25" height="25" alt="Logo"
            />
          <div className="graph-bottom-logo-text">
            Ask Anything!
          </div>
          { timeLi }
        </ul>
        <div className="countdown-time">
          <div style={ timeBarStyle }>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = Timebar;
