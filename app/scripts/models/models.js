var Backbone = require('backbone');

var ParseModel = Backbone.Model.extend({
  idAttribute: 'objectId',
  save: function(key, val, options){
    delete this.attributes.createdAt;
    delete this.ttributes.updatedAt;

    return Backbone.Model.prototype.save.apply(this, arguments);
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
  urlRoot: 'https://rene-recipe-app.herokuapp.com/Recipes',
  save: function(key, val, options){
    this.set('ingredients', this.get('ingredients').toJSON());

    return ParseModel.prototype.save.apply(this, arguments);
  },
  parse: function(dats){
    data.ingredients = new IngredientCollection(data.ingredients);
    return data
  }
});

var RecipeCollection = ParseCollection.extend({
  model: Recipe,
  url: 'https://rene-recipe-app.herokuapp.com/Recipes'
});

module.exports = {
  Ingredient: Ingredient,
  IngredientCollection: IngredientCollection,
  Recipe: Recipe,
  RecipeCollection: RecipeCollection
};
