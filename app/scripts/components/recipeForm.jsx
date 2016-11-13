var Backbone = require('backbone');
var React = require('react');
var Recipe = require('../models/models.js').Recipe;
var Template = require('./template.jsx');

var IngredientForm = React.createClass({
  getInitialState: function(){
    return this.props.ingredient.toJSON()
  },
  componentWillReceiveProps: function(nextProps){
    this.setState(nextProps.ingredient.toJSON());
  },
  handleInputChange: function(e){
    e.preventDefault();
    var target = e.target;

    var newState = {};
    newState[target.name] = target.value;

    this.props.ingredient.set(target.name, target.value);
    this.setState(newState);
  },
  removeIngredient: function(e){
    e.preventDefault();
    this.props.removeIngredient(this.props.ingredient);
  },
  render: function(){
    return(
      <div>
        <div className="form-group">
          <label className="sr-only" htmlFor="quantity">Amount</label>
          <input onChange={this.handleInputChange} type="text" className="form-control" name="quantity" id="quantity" placeholder="Quantity" value={this.state.quantity} />
        </div>
        <div className="form-group">
          <label className="sr-only" htmlFor="units">Units</label>
          <input onChange={this.handleInputChange} type="text" className="form-control" name="units" id="units" placeholder="Units" value={this.state.units} />
        </div>
        <div className="form-group">
          <label className="sr-only" htmlFor="name">Name</label>
          <input onChange={this.handleInputChange} type="text" className="form-control" name="name" id="name" placeholder="Ingredient Name" value={this.state.name} />
        </div>
        <button onClick={this.removeIngredient} type="button" className="btn btn-danger">Remove</button>
      </div>
    );
  }
});

var RecipeForm = React.createClass({
  getInitialState: function(){
    return this.props.recipe.toJSON();
  },
  componentWillReceiveProps: function(newProps){
    this.setState(newProps.recipe.toJSON());
  },
  handleInputChange: function(e){
    e.preventDefault();
    var target = e.target, newState = {};

    newState[target.name] = target.value;
    this.props.recipe.set(target.name, target.value);

    this.setState(newState)
  },
  handleSubmit: function(e){
    e.preventDefault();
    this.props.addRecipe(this.state);
  },
  render: function(){
    var recipe = this.props.recipe, self = this;

    var ingredientFormset = recipe.get('ingredients').map(function(ingredient){
      return(
        <IngredientForm key={ingredient.cid} ingredient={ingredient} removeIngredient={self.props.removeIngredient} />
      );
    });

    return(
      <form className="col-sm-10 col-sm-offset-1" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="recipe_name">Recipe Name</label>
          <input onChange={this.handleInputChange} type="text" className="form-control" name="recipe_name" id="recipe_name" placeholder="Recipe Name" value={this.state.recipe_name}/>
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Recipe Serving Size</label>
          <input onChange={this.handleInputChange} type="number" className="form-control" name="quantity" id="quantity" placeholder="Recipe Serving Size (number only)" value={this.state.quantity}/>
        </div>
        <div className="form-group">
          <label htmlFor="servings_unit">Recipe Servings Unit</label>
          <input onChange={this.handleInputChange} type="text" className="form-control" name="servings_unit" id="servings_unit" placeholder="Recipe Servings Unit (i.e. brownies, cookies, servings, etc.)" value={this.state.servings_unit}/>
        </div>
        <div className="form-group">
          <label htmlFor="recipe_type">Recipe Type</label>
          <select onChange={this.handleInputChange} id="recipe_type" name="recipe_type">
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="dessert">Dessert</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="prep_time">Prep Time (in min)</label>
          <input onChange={this.handleInputChange} type="number" className="form-control" id="prep_time" name="prep_time" placeholder="Prep Time in minutes (i.e. 30)" value={this.state.prep_time} />
          <label htmlFor="cook_time">Cook Time (in min)</label>
          <input onChange={this.handleInputChange} type="number" className="form-control" id="cook_time" name="cook_time" placeholder="Cook Time in minutes (i.e. 30)" value={this.state.cook_time}/>
          <label htmlFor="cook_temp">Cook Temp (in Farenheit)</label>
          <input onChange={this.handleInputChange} type="number" className="form-control" id="cook_temp" name="cook_temp" placeholder="Cook Temp in Farenheit (i.e. 350)" value={this.state.cook_temp}/>
        </div>

        <h3>Ingredients <button type="button" onClick={this.props.addIngredient} className="btn btn-success">Add Ingredient</button></h3>

        <div className="form-inline">
          {ingredientFormset}
        </div>

        <button type="submit" className="btn btn-primary">Save Changes</button>
      </form>
    );
  }
});

var RecipeFormContainer = React.createClass({
  getInitialState: function(){
    return {
      recipe: new Recipe()
    }
  },
  componentWillMount: function(){
    this.fetchRecipe();
  },
  componentWillReceiveProps: function(){
    this.fetchRecipe();
  },
  fetchRecipe: function(){
    var recipe = this.state.recipe, recipeId = this.props.id, self = this;

    if(!recipeId){
      return;
    }

    recipe.set({objectId: recipeId});
    recipe.fetch().then(function(){
      self.setState({recipe: recipe});
    });
  },
  addIngredient: function(){
    var recipe = this.state.recipe, ingredients = recipe.get('ingredients');

    ingredients.add([{}]);

    this.setState({recipe: recipe});
  },
  addRecipe: function(newRecipe){
    var recipe = this.state.recipe;
    newRecipe.quantity = parseInt(newRecipe.quantity);
    newRecipe.adjusted_quantity = parseInt(newRecipe.quantity);
    newRecipe.cook_time = parseInt(newRecipe.cook_time);
    newRecipe.prep_time = parseInt(newRecipe.prep_time);
    newRecipe.cook_temp = parseInt(newRecipe.cook_temp);

    console.log(newRecipe);

    recipe.set(newRecipe);
    recipe.set({
      creator: localStorage.getItem('name'),
      owner: {'__type':'Pointer', 'className': '_User', 'objectId': localStorage.getItem('userID')}
    })

    recipe.save().then(function(){
      Backbone.history.navigate('recipes/' + recipe.get('objectId') + '/', {trigger: true});
    });
  },
  removeIngredient: function(ingredientToRemove){
    var ingredients = this.state.recipe.get('ingredients');
    ingredients.remove(ingredientToRemove);
    this.setState({recipe: this.state.recipe})
  },
  render: function(){
    return(
      <Template>
        <div className="row">
          <h1>{this.props.id ? 'Edit' : 'Add'} Recipe</h1>
          <RecipeForm recipe={this.state.recipe} removeIngredient={this.removeIngredient} addRecipe={this.addRecipe} addIngredient={this.addIngredient} />
        </div>
      </Template>
    );
  }
});

module.exports = {
  RecipeFormContainer: RecipeFormContainer
};
