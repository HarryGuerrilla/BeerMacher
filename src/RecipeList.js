import React, { Component } from 'react';
import { Link } from 'react-router';
import { ListGroup } from 'react-bootstrap';

export default class RecipeList extends Component {
  constructor({ props }) {
    super(props);
  }

  render() {
    return(
      <div>
        <ListGroup vertical block>
        { this.props.recipes.map((recipe, index) => {
          return(
            <Link to={ 'recipe/' + index }
                  className="list-group-item list-group-item-action"
                  activeClassName="active">
              { recipe.name }
            </Link>
          );
          })}
        </ListGroup>
      </div>
    );
  }
}
