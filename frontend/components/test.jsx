var React = require('react');
var Modal = require("react-modal");

var Test = React.createClass({
  getInitialState: function(){
    return({ modalOpen: false });
  },
  closeModal: function(){
    this.setState({ modalOpen: false })
  },
  openModal: function(){
    this.setState({ modalOpen: true })
  },
  render: function(){
    return(
      <div>
        <button onClick={this.openModal}>Open Me!</button>

        <Modal
          isOpen={this.state.modalOpen}
          onRequestClose={this.closeModal}>

            <h2>Im a modal!</h2>
            <p>modal modal modal modal modal</p>
            <p>mooooooooodal!</p>

        </Modal>
      </div>
    );
  }
});

module.exports = Test;
