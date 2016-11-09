var React = require('react');
var LoginContainer = require('./login.jsx');

var LandingPageView = React.createClass({
  render: function(){
    return(
      <div className="container-fluid opening">
        <div className="row">
          <h1>Welcome to BatchMaker!</h1>
          <span><a href="#/recipes/">Check out some recipes!</a></span>
          <LoginContainer />
        </div>
      </div>
    );
  }
});

module.exports = LandingPageView;
