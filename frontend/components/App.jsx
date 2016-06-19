var React = require('react');
var SessionStore = require('./../stores/session_store');
var SessionApiUtil = require('./../util/session_api_util');
var Footer = require('./Footer');
var UserNavBar = require('./UserNavBar');
var NoUserNavBar = require('./NoUserNavBar');
var RootPageContent = require('./RootPageContent');

var App = React.createClass({
  componentDidMount: function () {
    this.sessionListener = SessionStore.addListener(this.forceUpdate.bind(this));
    SessionApiUtil.fetchCurrentUser();
  },

  componentWillUnmount: function () {
    this.sessionListener.remove();
  },

  isRootPage: function () {
    return (window.location.hash.slice(0, 4).toUpperCase() === "#/?_");
  },

  pageDoesNotHaveFooter: function (){
    return (window.location.hash.slice(2, 11).toUpperCase() === "QUESTIONS");
  },

  render: function() {
    var navigationBar;
    var rootPageContent;
    // Footer is taken out for now. Can be placed back in later.
    var footer = <Footer />;
    var minHeight= "min-height-700px";

    if (SessionStore.isUserLoggedIn()) {
      navigationBar = <UserNavBar />;
    } else {
      navigationBar = <NoUserNavBar />;
    }

    if (this.isRootPage()) {
      rootPageContent = <RootPageContent />
    } else {
      rootPageContent = "";
    }

    if (this.pageDoesNotHaveFooter()){
      footer = "";
      minHeight = "";
    }

    return (
      <div className={ "app " + minHeight }>
        { navigationBar }
        { rootPageContent }
        {this.props.children}
      </div>
    );
  }
});

module.exports = App;
