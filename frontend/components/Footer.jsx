var React = require('react');
var Link = require('react-router').Link;

var Footer = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  render: function () {
    var footerSurvey = "";

    if (window.location.hash.slice(2, 9).toUpperCase() === "SURVEYS") {
      footerSurvey = "footer-survey";
    }

    if (window.location.hash.slice(2, 9).toUpperCase() === "PROFILE") {
      footerSurvey = "footer-survey";
    }

    return (
      <div className={"footer-container " + footerSurvey }>
        <div className="footer-div-container group text-center">
          <div className="footer-ul-container">
            <ul className="footer-li-container">Services
              <li>
                <Link to="education">Education</Link>
              </li>
              <li>
                <Link to="training">Training</Link>
              </li>
              <li>
                <Link to="business">Business</Link>
              </li>
              <li>
                <Link to="events">Events</Link>
              </li>
              <li>
                <Link to="more">More</Link>
              </li>
            </ul>
          </div>

          <div className="footer-ul-container">
            <ul className="footer-li-container">Resources
              <li>
                <Link to="features">Features</Link>
              </li>
              <li>
                <Link to="how_it_works">How it works</Link>
              </li>
              <li>
                <Link to="faq">FAQ</Link>
              </li>
              <li>
                <Link to="user_guide">User Guide</Link>
              </li>
              <li>
                <Link to="use_cases">Use Cases</Link>
              </li>
            </ul>
          </div>

          <div className="footer-ul-container">
            <ul className="footer-li-container">Company
              <li>
                <Link to="about">About</Link>
              </li>
              <li>
                <Link to="blog">Blog</Link>
              </li>
              <li>
                <Link to="other_projects">Other Projects</Link>
              </li>
              <li>
                <Link to="linkedIn">LinkedIn</Link>
              </li>
              <li>
                <Link to="github">Github</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = Footer;
