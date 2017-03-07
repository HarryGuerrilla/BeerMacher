import React from 'react';
import ReactDOM from 'react-dom';
import { Recipe } from '../';
import * as data from '../../assets/paleAle.json';

const props = {
  recipe: data.recipes[0],
  recipes: data.recipes,
  selectRecipe: (id) => {
    return data.recipes[0]
  },
  params: {
    id: "1",
  }
}

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Recipe {...props }/>, div);
});
