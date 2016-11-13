var $ = require('jquery');
var Backbone = require('backbone');
var setupParse = require('../parseUtilities.js').setupParse;

var User = Backbone.Model.extend({
  defaults: {
    name: '',
    username: '',
    password: ''
  },
  idAttribute: 'objectId',
  urlRoot: 'https://rene-recipe-app.herokuapp.com/',
  parse: function(data){
    return data.results;
  },
  login: function(username, password){
    var url = this.urlRoot + 'login?username=' + username + '&password=' + encodeURI(password);

    $.ajax(url).then(function(response){
      localStorage.setItem('sessionToken', response.sessionToken);
      localStorage.setItem('userSession', JSON.stringify(response));
      localStorage.setItem('userID', response.objectId);
      localStorage.setItem('name', response.name);

      setupParse('recipe_calc', 'france', response.sessionToken);

      Backbone.history.navigate('recipes/', {trigger: true});
    });
  },
  signUp: function(username, password, name){
    var self = this;
    var url = this.urlRoot + 'users';

    $.post(url, {'username': username, 'password': password, 'name': name}).then(function(){
      self.login(username, password);
    });
  }
});

var ParseModel = Backbone.Model.extend({
  idAttribute: 'objectId',
  save: function(key, val, options){
    delete this.attributes.createdAt;
    delete this.attributes.updatedAt;

    return Backbone.Model.prototype.save.apply(this, arguments);
  },
  parse: function(data){
    return data.results;
  }
});

var ParseCollection = Backbone.Collection.extend({
  parse: function(data){
    return data.results;
  }
});

var Ingredient = ParseModel.extend({
  defaults: {
    name: '',
    amount: 0,
    units: ''
  }
});

var IngredientCollection = ParseCollection.extend({
  model: Ingredient,
  url: 'https://rene-recipe-app.herokuapp.com/Ingredients'
});

var Recipe = ParseModel.extend({
  defaults: {
    ingredients: new IngredientCollection()
  },
  urlRoot: 'https://rene-recipe-app.herokuapp.com/classes/Recipes',
  save: function(key, val, options){
    this.set('ingredients', this.get('ingredients').toJSON());

    return ParseModel.prototype.save.apply(this, arguments);
  },
  parse: function(data){
    data.ingredients = new IngredientCollection(data.ingredients);
    return data
  },
  deleteRecipe: function(recipeId){
    $.ajax({
      url:'https://rene-recipe-app.herokuapp.com/classes/Recipes/'+recipeId,
      type: 'DELETE',
      success: function(result){
        console.log(result);
      }
    });
  }
});

var RecipeCollection = ParseCollection.extend({
  model: Recipe,
  url: 'https://rene-recipe-app.herokuapp.com/classes/Recipes'
});

module.exports = {
  Ingredient: Ingredient,
  IngredientCollection: IngredientCollection,
  Recipe: Recipe,
  RecipeCollection: RecipeCollection,
  User: User
};
