var React = require('react');

var Searchbar = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  handleSearch: function(e){
    var searchQuery = e.target.value;
  },

  render: function () {
    return (
      <div>
        <input className="searchbar-input" placeholder="           Search..." onChange={ this.handleSearch }>
        </input>
      </div>
    )
  }
});

module.exports = Searchbar;
