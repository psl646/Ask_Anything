var React = require('react');

var Searchbar = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  render: function () {
    return (
      <div>
        <input className="searchbar-input" placeholder="           Search...">
        </input>
      </div>
    )
  }
});

module.exports = Searchbar;
