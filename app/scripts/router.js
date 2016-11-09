var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');

var setupParse = require('./parseUtilities.js').setupParse;
var LandingPageView = require('./components/landing.jsx');
var RecipeListContainer = require('./components/recipeList.jsx').RecipeListContainer;
var LoginContainer = require('./components/login.jsx');
var SignUpContainer = require('./components/signUp.jsx');


var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index',
    'sign-up/': 'signUp',
    'recipes/add/': 'recipeForm',
    'recipes/:id/edit/': 'recipeForm',
    'recipes/:id/': 'recipeView',
    'recipes/': 'recipeList'
  },
  initialize: function(){
    setupParse('recipe_calc', 'france');
  },
  sessionTokenCheck: function(){
    if(!localStorage.getItem('sessionToken')){
      this.navigate('/login/', {trigger: true});
    }
  },
  index: function(){
    ReactDOM.render(
      React.createElement(LandingPageView),
      document.getElementById('app')
    );
  },
  login: function(){
    ReactDOM.render(
      React.createElement(LoginContainer),
      document.getElementById('app')
    );
  },
  signUp: function(){
    ReactDOM.render(
      React.createElement(SignUpContainer),
      document.getElementById('app')
    );
  },
  recipeForm: function(id){
    this.sessionTokenCheck();

  },
  recipeView: function(id){
    this.sessionTokenCheck();

  },
  recipeList: function(){
    ReactDOM.render(
      React.createElement(RecipeListContainer),
      document.getElementById('app')
    );

    this.sessionTokenCheck();
  }
});

var router = new AppRouter();

module.exports = router;
