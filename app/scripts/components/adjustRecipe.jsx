var React = require('react');

var AdjustRecipeForm = React.createClass({
  getInitialState: function(){
    console.log(this.props.recipe);
    return{
      qty: this.props.recipe.get('adjusted_quantity')
    };
  },
  componentWillReceiveProps: function(nextProps){
    this.setState({qty: nextProps.recipe.get('adjusted_quantity')});
  },
  handleQty: function(e){
    console.log('fired');
    this.setState({qty: e.target.value});
    this.props.adjustQtys(e.target.value);
  },
  handleSubmit: function(e){
    e.preventDefault();
    this.props.adjustQtys(this.state.qty);
  },
  render: function(){
    console.log(this.state.qty);
    return(
      <form onSubmit={this.handleSubmit} className="form-inline well">
        <div className="form-group">
          How many {this.props.recipe.get('servings_unit')} would you like? <input onChange={this.handleQty} type="text" value={this.state.qty} />
        </div>
      </form>
    );
  }
});

var IngredientsList = React.createClass({
  render: function(){
    var factor = this.props.factor;

    if(this.props.ingredients){
      var ingredients = this.props.ingredients.map(function(ingredient){
        var newAmount = ingredient.get('quantity') * factor;
        var amount = parseInt(newAmount) === newAmount ? newAmount : newAmount.toFixed(2);

        return(
          <li key={ingredient.cid} className="list-group-item">
            {amount} {ingredient.get('units')} {ingredient.get('name')}
          </li>
        );
      });
    }
    return(
      <ul className="list-group">
        {ingredients ? ingredients : null}
      </ul>
    );
  }
});

var AdjustRecipeContainer = React.createClass({
  getInitialState: function(){
    return{
      factor: 1
    };
  },
  adjustQtys: function(desiredServings){
    var recipe = this.props.recipe;
    var newFactor = (desiredServings/recipe.get('quantity')) || 1;

    recipe.set({adjusted_quantity: desiredServings});

    this.setState({factor: newFactor});
  },
  render: function(){
    return(
      <div>
        <AdjustRecipeForm recipe={this.props.recipe} adjustQtys={this.adjustQtys}/>
        <p className="lead">Ingredients</p>
        <IngredientsList factor={this.state.factor} ingredients={this.props.recipe.get('ingredients')}/>
      </div>
    );
  }
});

module.exports = {
  AdjustRecipeContainer: AdjustRecipeContainer
};
