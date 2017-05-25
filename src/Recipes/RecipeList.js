import React, { Component } from 'react';
import { Link } from 'react-router';
import { ListGroup, Panel } from 'react-bootstrap';
import { connect } from 'react-redux';
import { selectRecipe, getAllRecipeNames } from './actions/recipe_actions.js';
import { bindActionCreators } from 'redux';

class RecipeList extends Component {
  constructor({ props }) {
    super(props);
  }

  componentWillMount() {
    this.props.getAllRecipeNames();
  }

  render() {
    const recipes = this.props.recipes;

    if (recipes.length === 0) {
      return <div>Loading...</div>;
    }

    return (
      <Panel header="Recipes">
        <ListGroup>
          {Object.keys(recipes).map(recipe => {
            return (
              <Link
                to={'/recipe/' + recipe}
                className="list-group-item list-group-item-action"
                activeClassName="active"
                onClick={() => this.props.selectRecipe(recipe)}
                key={recipe}>
                {recipes[recipe].name}
              </Link>
            );
          })}
        </ListGroup>
      </Panel>
    );
  }
}

function mapStateToProps(state) {
  return {
    recipes: state.recipes,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectRecipe, getAllRecipeNames }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeList);
