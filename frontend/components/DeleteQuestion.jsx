var React = require('react');
var Link = require('react-router').Link;

var DeleteQuestion = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return { random: 1 };
  },

  componentDidMount: function () {

  },

  componentWillUnmount: function () {
  },

  closeMyself: function () {
    this.props.closeThisModal();
  },

	handleOK: function (e) {
		e.preventDefault();
  },

	render: function () {

    return (
      <div>
        <div>
          Delete question
        </div>

        <div>
          Are you sure you want to remove the question "{ this.props.question.question }"?
        </div>

        <div>
          If you click OK this question will be gone forever!
        </div>
        <ul>
          <li>
            Cancel
          </li>
          <li>
            OK
          </li>
        </ul>
      </div>
		);
	}
});

module.exports = DeleteQuestion;
