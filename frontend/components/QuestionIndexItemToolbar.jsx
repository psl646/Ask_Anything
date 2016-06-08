var React = require('react');

var QuestionIndexItemToolbar = React.createClass ({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return ({});
  },

  isEditPage: function () {
    var path = window.location.hash.split("?")[0].slice(2).toLowerCase();
    return (path.startsWith("questions") && path.endsWith("edit"));
  },

  render: function () {
    // DO SOMETHING HERE
    this.isEditPage();

    return (
      <div className="questionindexitem-toolbar">

        <ul>
          <li>
            How people can respond
          </li>
          <li>
            Response settings
          </li>
          <li>
            Schedule lock/unlock times
          </li>
        </ul>

        <ul>
        </ul>
      </div>
    )
  }
});

module.exports = QuestionIndexItemToolbar;
