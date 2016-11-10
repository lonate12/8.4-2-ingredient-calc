var React = require('react');
var RecipeCollection = require('../models/models.js').RecipeCollection;
var setupParse = require('../parseUtilities.js').setupParse;
var Template = require('./template.jsx');

var RecipeListContainer = React.createClass({
  getInitialState: function(){
    var self = this;
    var recipeCollection = new RecipeCollection();

    setupParse('recipe_calc', 'france', localStorage.getItem('sessionToken'));

    recipeCollection.fetch().then(function(response){
      self.setState({recipeCollection: self.state.recipeCollection});
    });
    return{
      recipeCollection: recipeCollection
    };
  },
  render: function(){
    var recipes = this.state.recipeCollection.map(function(recipe){
      return(
        <div className="col-sm-6 col-md-4" key={recipe.get('objectId')}>
          <div className="thumbnail">
            <img src={recipe.get('image_url')} alt={recipe.get('recipe_name')} />
            <div className="caption">
              <h3>{recipe.get('recipe_name')}</h3>
              <p><a href={'#/recipes/' + recipe.get('objectId')+'/'} className="btn btn-primary" role="button">Check out recipe</a></p>
            </div>
          </div>
        </div>
      );
    });
    return(
      <Template>
        <div className="row">
          {recipes}
        </div>
      </Template>
    );
  }
});

module.exports = {
  RecipeListContainer: RecipeListContainer
};
