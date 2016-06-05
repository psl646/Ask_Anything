var React = require('react');
var Link = require('react-router').Link;
var QuestionConstants = require('../constants/question_constants');
var AnswerInput = require('./AnswersForm');

var QuestionForm = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return ({
      question: this.props.question,
      category: "Multiple Choice",
      answers: [<AnswerInput />, <AnswerInput />]
    });
  },

  componentDidMount: function () {
    this.questionListener = QuestionStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.questionListener.remove();
  },

  _onChange: function () {

  },

	handleSubmit: function (e) {
		e.preventDefault();

		var formData = {
      question: this.state.question,
      category: this.state.category,
      answers: this.state.answers
		};
	},

  questionChange: function (e) {
    var newQuestion = e.target.value;
    this.setState({ question: newQuestion});
  },

  categoryChange: function (e) {
    console.log("categoryChange");
    var newCategory = e.target.value;
    this.setState({ category: newCategory});
  },

  addAnswersChange: function (e) {

  },

  handleDeleteQuestion: function (e) {
    e.preventDefault();

  },

	render: function () {
    var categories = QuestionConstants.QUESTION_CATEGORIES.map(function(category, idx) {
      return (
        <li key={ idx }> { category }
          <input
            type="radio"
            name="questionCategory"
            value={ category }
            checked={ this.state.category === category }
            onChange={this.categoryChange}
            />
        </li>
      );
    }.bind(this));
    console.log("after");
    console.log(categories);

    var myNewAnswers = this.state.answers.map(function(answer, idx){
      return (
        <li key={ idx }>
          { answer }
        </li>
      );
    });

    return (
      <div className="signup-form-container">
        <div onClick={ this.handleDeleteQuestion }>
          X
        </div>

        <br />
        <label> Question: <br/>
          <input
            type="text"
            value={this.state.question}
            onChange={this.questionChange} />
        </label>

        <br />

        <div>How will my audience respond?
          <ul>
            { categories }
          </ul>

          <ul> Your audience can select from these answers:
            { myNewAnswers }
          </ul>
        </div>


        <div className="agreement">By proceeding you agree to Ask Anything!</div>
        <div className="agreement"><Link to="tos" className="link">Terms of Service</Link> and <Link to="privacyPolicy" className="link">Privacy Policy</Link>.</div>
      </div>
		);
	}
});

module.exports = QuestionForm;
