var React = require('react');
var Backbone = require('backbone');
var User = require('../models/models.js').User;

var SignUpContainer = React.createClass({
  getInitialState: function(){
    return {
      user: new User(),
      username: '',
      password: '',
      name: ''
    }
  },
  handleInputChange: function(e){
    var target = e.target;

    var newUser = {};
    newUser[target.id] = target.value;

    this.setState(newUser);
    this.state.user.set({username: this.state.username, password: this.state.password});
    console.log(this.state);
  },
  signUp: function(e){
    e.preventDefault();

    this.state.user.signUp(this.state.username, this.state.password, this.state.name);
  },
  render: function(){
    return(
      <div className="container-fluid opening">
        <div className="row">
          <h1>Welcome to BatchMaker!</h1>
          <div className="col-md-6 col-md-offset-3">
            <h2>Sign Up for a free account!</h2>
            <form onSubmit={this.signUp}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input onChange={this.handleInputChange} type="text" className="form-control" id="name" placeholder="First name only please" required="required"/>
              </div>
              <div className="form-group">
                <label htmlFor="username">Email address</label>
                <input onChange={this.handleInputChange} type="email" className="form-control" id="username" placeholder="Email" required="required"/>
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input onChange={this.handleInputChange} type="password" className="form-control" id="password" placeholder="Password" required="required"/>
              </div>
              <button type="submit" className="btn btn-success">Login</button>
            </form>
            <p>Already have an account? <a href="#">Click here to login!</a></p>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = SignUpContainer;
