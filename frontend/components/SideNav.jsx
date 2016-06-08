var React = require('react');
var Link = require('react-router').Link;
var Modal = require('react-modal');
var ModalConstants = require('../constants/modal_constants');
var QuestionFormGenerator = require('./QuestionFormGenerator');

var SideNav = React.createClass ({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  getInitialState: function () {
    return ({ modalOpen: false });
  },

  closeModal: function(){
    this.setState({ modalOpen: false })
  },

  openModal: function(){
    window.setTimeout(function () {
      this.setState({ modalOpen: true });
    }.bind(this), 500);
  },

  render: function () {
    return (
      <div className="sidenav-container">
        <ul className="sidenav-list">
          <li className="question-form-button soft-edges hover-pointer" onClick={this.openModal}>
            Create
            <Modal
              isOpen={this.state.modalOpen}
              onRequestClose={this.closeModal}
              style={ ModalConstants.QUESTION_FORM }>

                <QuestionFormGenerator closeThisModal={ this.closeModal } />

            </Modal>
          </li>

          <Link to="surveys" className="sidenav-list-link soft-edges hover-pointer">
            My Questions
          </Link>

          <Link to="account_question" className="sidenav-list-link soft-edges hover-pointer blue-color-text">
            Account Questions
          </Link>

        </ul>
      </div>
    )
  }
});

module.exports = SideNav;
