var React = require('react');

var AdjustRecipeForm = React.createClass({
  getInitialState: function(){
    return{
      qty: this.props.recipe.get('quantity')
    };
  },
  componentWillReceiveProps: function(nextProps){
    this.setState({qty: nextProps.recipe.get('quantity')});
  },
  handleQty: function(e){
    this.setState({qty: e.target.value});
    this.props.adjustQtys(e.target.value);
  },
  render: function(){
    return(
      <form className="form-inline well">
        <div className="form-group">
          How many {this.props.recipe.get('servings_unit')} would you like? <input onChange={this.handleQty} type="text" value={this.state.qty} />
        </div>
      </form>
    );
  }
});

var IngredientsList = React.createClass({
  render: function(){
    return(
      <h1>Ingredients</h1>
    );
  }
});

var AdjustRecipeContainer = React.createClass({
  adjustQtys: function(adjustmentValue){
    console.log(adjustmentValue);
  },
  render: function(){
    return(
      <div>
        <AdjustRecipeForm recipe={this.props.recipe} adjustQtys={this.adjustQtys}/>
        <p className="lead">Ingredients</p>
        <IngredientsList />
      </div>
    );
  }
});

module.exports = {
  AdjustRecipeContainer: AdjustRecipeContainer
};
