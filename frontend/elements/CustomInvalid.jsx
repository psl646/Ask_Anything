var React = require('react');

// components
var Logo = require('./components/Logo');

var CustomInvalid = React.createElement(
  (<div>
    <Logo />
    <div className="no-user-message-container soft-edges">
      <div className="end-of-internet">
        You've reached the end of the Internet
      </div>
      <div className="h11-5 404-message">
        The page you're looking for can't be found. (404)
      </div>
      <ul className="no-user-message-ul">
        <div>
          Try these:
        </div>
        <li>
          Make sure the URL is correct.
        </li>
        <li>
          Has this question or presenter been deleted?
        </li>
      </ul>
    </div>
  </div>
));

module.exports = CustomInvalid;
