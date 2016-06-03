var React = require('react');

var QuestionFormGenerator = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

	render: function () {
    return (
      <div>
        This is the Question Form Generator
      </div>
		);
	}
});

module.exports = QuestionFormGenerator;
