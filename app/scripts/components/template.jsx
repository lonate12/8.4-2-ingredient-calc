var React = require('react');

var Template = React.createClass({
  render: function(){
    return(
    <div>
      <div className="container-fluid">
        <header className="col-md-12">
          <span>Logo Here</span>
          <span><a href="#/recipes/">Recipes</a></span>
          <span className="push-right">Sign Out</span>
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
