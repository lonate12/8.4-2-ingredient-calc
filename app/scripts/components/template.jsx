var Backbone = require('backbone');
var React = require('react');


var Template = React.createClass({
  signOut: function(e){
    e.preventDefault();
    localStorage.clear();
    Backbone.history.navigate('', {trigger: true});
  },
  render: function(){
    return(
    <div>
      <div className="container-fluid">
        <header className="top-header row">
          <div className="logo"><a href="#" className="logo-link"></a></div>
          <span><a href="#/recipes/">Recipes</a></span>
          <span><a onClick={this.signOut} href="#">Sign Out</a></span>
        </header>
      </div>
      <div className="container-fluid main">
        {this.props.children}
      </div>
      <div className="container-fluid">
        <footer className="row footer">
          <a href="#"><div className="logo"></div></a>
        </footer>
      </div>
    </div>
    );
  }
});

module.exports = Template;
