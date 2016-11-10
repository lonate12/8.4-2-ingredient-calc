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
  render: function(){
    var recipe = this.state.recipe;
    return(
      <Template>
        <div className=" recipe-name row">
          <h1>{recipe.get('recipe_name')}</h1>
          <img className="col-md-6 col-md-offset-3" src={recipe.get('image_url')} alt={recipe.get('recipe_name')}/>
          <a href={'#/recipes/'+recipe.get('objectId')+'/edit/'} className="button-link">Edit</a>
        </div>
        <AdjustRecipeContainer recipe={this.state.recipe}/>
      </Template>
    );
  }
});

module.exports = {
  RecipeDetailContainer: RecipeDetailContainer
};
