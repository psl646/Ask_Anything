var React = require('react');
var Link = require('react-router').Link;
var Modal = require('react-modal');
var ModalConstants = require('../constants/modal_constants');
var QuestionFormGenerator = require('./QuestionFormGenerator');
var Searchbar = require('./Searchbar');
var SessionStore = require('../stores/session_store.js');
var TourStore = require('../stores/tour_store.js');
var TourActions = require('../actions/tour_actions.js');

var SideNav = React.createClass ({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return ({ modalOpen: false });
  },

  componentDidMount: function () {
    var currentUser = SessionStore.currentUser();
    var currentPart = TourStore.getPart();

    if (currentUser["tour"] === "true" && currentPart === 0 && window.localStorage["tourPart"] === undefined){
      this.handleTour();
    }
  },

  closeModal: function(){
    this.setState({ modalOpen: false })
  },

  openModal: function(){
    window.setTimeout(function () {
      this.setState({ modalOpen: true });
    }.bind(this), 500);
  },

  handleTour: function(){
    var intro = introJs();
    intro.setOptions({
      showStepNumbers: false,
      doneLabel: "Continue Tour",
      steps:[
        {
          intro: "This is where you can view a list of all your questions.  When hovering over a question, you can edit/delete existing questions by selecting the corresponding options."
        },
        {
          intro: "Additionally, an active question that others can respond to will have a green background.  You can activate/deactivate a question by selecting the wifi icon."
        },
        {
          element: document.getElementById("introjs-searchbar"),
          intro: "You can search for a particular question here.",
          position: "right"
        },
        {
          element: document.getElementById("introjs-show-all-questions"),
          intro: "You can view all your questions by clicking here.",
          position: "right"
        },
        {
          element: document.getElementById("introjs-question-form-button"),
          intro: "You can create a question by clicking here. Let's create a question now.  Click 'Continue Tour' below.",
          position: "right"
        }
      ]
    })
    intro.start().oncomplete(function(){
      this.openModal();
    }.bind(this));
    window.setTimeout(function(){
      TourActions.partOneComplete();
      window.localStorage["tourPart"] = "one";
    }, 0);
  },

  render: function () {
    return (
      <div className="sidenav-container">
        <ul className="sidenav-list">
          <li id="introjs-question-form-button" className="question-form-button soft-edges hover-pointer" onClick={this.openModal}>
            Create
            <Modal
              isOpen={this.state.modalOpen}
              onRequestClose={this.closeModal}
              style={ ModalConstants.QUESTION_FORM }>

                <QuestionFormGenerator closeThisModal={ this.closeModal } />

            </Modal>
          </li>

          <Searchbar />

        </ul>
      </div>
    )
  }
});

module.exports = SideNav;
