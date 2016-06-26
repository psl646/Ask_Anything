var React = require('react');

var Construction = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  render: function () {
    return (
      <div>
        The link you clicked on is under construction!
      </div>
    );

  }
});

module.exports = Construction;
