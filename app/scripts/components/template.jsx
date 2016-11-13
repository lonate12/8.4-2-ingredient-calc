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
        <header className="col-md-12">
          <span>Logo Here</span>
          <span><a href="#/recipes/">Recipes</a></span>
          <span className="pull-right"><a onClick={this.signOut} href="#">Sign Out</a></span>
        </header>
      </div>
      <div className="container">
        {this.props.children}
      </div>
      <div className="container-fluid">
        <footer className="col-md-12">
          <span>Logo Here</span>
        </footer>
      </div>
    </div>
    );
  }
});

module.exports = Template;
