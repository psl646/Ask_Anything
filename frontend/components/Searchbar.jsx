var React = require('react');
// actions
var ClientQuestionActions = require('../actions/client_question_actions');

var Searchbar = React.createClass({
  getInitialState: function (){
    return ({
      search: ""
    });
  },

  handleSearch: function (e){
    var searchQuery = e.target.value;
    this.setState({ search: searchQuery });
    window.setTimeout(function(){
      if (this.compareSearch(searchQuery)){
        var mySearch = this.state.search;
        if (mySearch === ""){
          ClientQuestionActions.fetchAllQuestions();
        } else {
          ClientQuestionActions.fetchQuestionsByQuery(mySearch);
        }
      }
    }.bind(this), 1000);
  },

  compareSearch: function (currentSearchQuery){
    return currentSearchQuery === this.state.search;
  },

  showAllQuestions: function (e){
    e.preventDefault();
    this.setState({ search: "" });
    ClientQuestionActions.fetchAllQuestions();
  },

  render: function () {
    return (
      <div>
        <div>
          <input className="sidenav-list-link soft-edges" placeholder=" Search questions..." onChange={ this.handleSearch } value={ this.state.search }/>
        </div>
        <div className="sidenav-list-link soft-edges hover-pointer" onClick={ this.showAllQuestions }>
          Show All Questions
        </div>
      </div>
    )
  }
});

module.exports = Searchbar;
