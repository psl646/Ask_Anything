var React = require('react');

var Logo = React.createClass({
  render: function () {
    return (
      <div className='logo'>
        <img className='logo-image' src={window.askAnythingAssets.logo} width="35" height="35" alt="Logo" />
        <h1 className='logo-text'>Ask Anything!</h1>
      </div>
    )
  }
});

module.exports = Logo;
