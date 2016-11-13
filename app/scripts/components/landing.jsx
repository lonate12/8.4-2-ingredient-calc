var React = require('react');
var LoginContainer = require('./login.jsx');

var LandingPageView = React.createClass({
  render: function(){
    return(
      <div className="container-fluid opening">
        <div className="row">
          <div className="brownbg">
            <h1 className="opening-title">Welcome to BatchMaker</h1>
            <div className="div-logo"></div>
          </div>
          <span><a className="opposite" href="#/recipes/">Check out some recipes!</a></span>
          <LoginContainer />
        </div>
      </div>
    );
  }
});

module.exports = LandingPageView;
