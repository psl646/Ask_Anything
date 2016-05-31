var React = require('react');

var Logo = React.createClass({
  render: function () {
    return (
      <div className='logo'>
        <img className='logo-image' src="http://67.media.tumblr.com/493315168e2ec76ebccc50c2995fc356/tumblr_o8243mWDYt1vqr4ifo1_400.png" width="35" height="35" alt="HTML Dog" />
        <h1 className='logo-text'>Ask Anything!</h1>
      </div>
    )
  }
});

module.exports = Logo;
