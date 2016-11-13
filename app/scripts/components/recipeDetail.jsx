var Backbone = require('backbone');
var React = require('react');
var Recipe = require('../models/models.js').Recipe;
var Template = require('./template.jsx');
var AdjustRecipeContainer = require('./adjustRecipe.jsx').AdjustRecipeContainer;

var RecipeDetailContainer = React.createClass({
  getInitialState: function(){
    return{
      recipe: new Recipe()
    };
  },
  componentWillMount: function(){
    var recipe = this.state.recipe, id = this.props.id, self = this;

    recipe.set('objectId', id);
    recipe.fetch().then(function(response){
      self.setState({recipe: recipe});
    });
  },
  handleDelete: function(){
    var recipe = this.state.recipe;

    recipe.deleteRecipe(recipe.get('objectId'));
    alert('Recipe deleted');
    Backbone.history.navigate('#/recipes/', {trigger: true});
  },
  render: function(){
    var recipe = this.state.recipe;
    return(
      <Template>
        <div className="recipe-name row">
          <h1 className="recipe-header-name">{recipe.get('recipe_name')}</h1>
          <img className="detail-image col-md-6 col-md-offset-3" src={recipe.get('image_url')} alt={recipe.get('recipe_name')}/>
          <a href={'#/recipes/'+recipe.get('objectId')+'/edit/'} className="button-link">Edit</a>
        </div>
        <AdjustRecipeContainer recipe={this.state.recipe}/>
        <button type="button" className="recipe-delete btn btn-danger pull-right" onClick={this.handleDelete}>Delete This Recipe</button>
      </Template>
    );
  }
});

module.exports = {
  RecipeDetailContainer: RecipeDetailContainer
};
