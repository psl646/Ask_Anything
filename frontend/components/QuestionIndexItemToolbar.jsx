var React = require('react');

var QuestionIndexItemToolbar = React.createClass ({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return ({});
  },

  render: function () {
    return (
      <div className="questionindexitem-toolbar">

        <ul>
          <li>
          </li>
        </ul>
      </div>
    )
  }
});

module.exports = QuestionIndexItemToolbar;
