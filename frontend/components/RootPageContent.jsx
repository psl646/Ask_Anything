var React = require('react');
var Link = require('react-router').Link;
var DemoContent = require('./DemoContent');

var RootPageContent = React.createClass({
  componentDidMount: function () {
  },

  componentWillUnmount: function () {
  },

  render: function() {
    return (
      <div>

        <DemoContent className="demo-content-position"/>

      </div>
    );
  }
});

module.exports = RootPageContent;
