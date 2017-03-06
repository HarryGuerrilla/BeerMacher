import React, { Component } from 'react';
import { Link } from 'react-router';
import { ListGroup, Panel } from 'react-bootstrap';
import { connect } from 'react-redux';
import { selectRecipe } from './actions/recipe_actions.js'
import { bindActionCreators } from 'redux';

class RecipeList extends Component {
  constructor({ props }) {
    super(props);

  }

  render() {
    if(this.props.recipes.length === 0) {
      console.log('recipes ==', this.props.recipes)
      return(<div>Loading...</div>)
    }
    return(
      <Panel header="Recipes">
        <ListGroup>
        { this.props.recipes.map((recipe) => {
          return(
            <Link to={ '/recipe/' + recipe.id }
                  className="list-group-item list-group-item-action"
                  activeClassName="active"
                  onClick={ () => this.props.selectRecipe(recipe.id) }
                  key={ recipe.id }>
              { recipe.name }
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
    recipes: state.recipes
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectRecipe }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeList)
