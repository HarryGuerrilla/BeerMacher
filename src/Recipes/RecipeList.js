import React, { Component } from 'react';
import { Link } from 'react-router';
import { ListGroup, Panel } from 'react-bootstrap';
import { connect } from 'react-redux';

class RecipeList extends Component {
  constructor({ props }) {
    super(props);

  }

  render() {
    return(
      <Panel header="Recipes">
        <ListGroup>
        { this.props.recipes.map((recipe) => {
          return(
            <Link to={ '/recipe/' + recipe.id }
                  className="list-group-item list-group-item-action"
                  activeClassName="active"
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

export default connect(mapStateToProps)(RecipeList)
