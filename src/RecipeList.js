import React, { Component } from 'react';
import { Link } from 'react-router';

export default class RecipeList extends Component {
  constructor({ props }) {
    super(props);
  }

  render() {
    return(
      <div>
        <ul>
        { this.props.recipes.map((recipe, index) => {
          return(
            <li key={index}>
              <Link to={ 'recipe/' + index }>{ recipe.name }</Link>
            </li>
            );
         })}
        </ul>
      </div>
    );
  }
}
