var User = require('../models/models.js').User;
var Backbone = require('backbone');
var React = require('react');

var LoginContainer = React.createClass({
  getInitialState: function(){
    return {
      user: new User(),
      username: '',
      password: ''
    }
  },
  handleInputChange: function(e){
    var target = e.target;

    var newUser = {};
    newUser[target.id] = target.value;

    this.setState(newUser);
    this.state.user.set({username: this.state.username, password: this.state.password});
  },
  login: function(e){
    e.preventDefault();

    this.state.user.login(this.state.username, this.state.password);

    Backbone.history.navigate('recipes/', {trigger: true});
  },
  render: function(){
    console.log(this.state);
    return(
      <div className="col-md-6 col-md-offset-3">
        <h2 className="login-dark">Login</h2>
        <form onSubmit={this.login}>
          <div className="form-group">
            <label className="login-dark" htmlFor="username">Email address</label>
            <input onChange={this.handleInputChange} type="text" className="form-control" id="username" placeholder="Email" />
          </div>
          <div className="form-group">
            <label className="login-dark" htmlFor="password">Password</label>
            <input onChange={this.handleInputChange} type="password" className="form-control" id="password" placeholder="Password" />
          </div>
          <button type="submit" className="btn btn-success">Login</button>
        </form>
        <p className="login-dark">Don't have an account? <a href="#/sign-up/" className="opposite">Sign up for free!</a></p>
      </div>
    );
  }
});

module.exports = LoginContainer;
