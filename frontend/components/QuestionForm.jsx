// {questions: [ {
//   question: "What's up?",
//   category: "multiple_choice",
//   answers: [ {answer: "Aasdfsdf" }, { }, { }, { } ]
// }, {
//   question: "What's up?",
//   category: "multiple_choice",
//   answers: [ {answer: "Aasdfasdf" }, { }, { }, { } ]
// }]}

var React = require('react');
var Link = require('react-router').Link;

var QuestionForm = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return ({ num_questions: 0, questions: [], question: "" });
  },




  _onChange: function () {

  },

  componentDidMount: function () {
    this.questionListener = QuestionStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.questionListener.remove();
  },

	handleSubmit: function (e) {
		e.preventDefault();

		var formData = {
      questions: this.state.questions
		};

    // PROB QUESTIONAPIUTIL
	},

  questionChange: function (e) {
    var newQuestion = e.target.value;
    this.setState({ question: newQuestion});
  },

	render: function () {
    return (
      <div className="signup-form-container">

        <form onSubmit={this.handleSubmit}>
          <label> Question <br/>
            <input type="string" value={this.state.question} onChange={this.questionChange} />
          </label>

          <input
            className="signup-button soft-edges hover-pointer"
            type="submit"
            value="Create my Ask Anything! account"
            />
        </form>

        <div className="agreement">By proceeding you agree to Ask Anything!</div>
        <div className="agreement"><Link to="tos" className="link">Terms of Service</Link> and <Link to="privacyPolicy" className="link">Privacy Policy</Link>.</div>
      </div>
		);
	}
});

module.exports = QuestionForm;
