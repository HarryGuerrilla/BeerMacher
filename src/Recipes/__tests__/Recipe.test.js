import React from 'react';
import ReactDOM from 'react-dom';
import { Recipe } from '../';
import * as data from '../../assets/paleAle.json';

const props = {
  recipes: data.recipes,
  params: {
    id: "1",
  }
}

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Recipe {...props }/>, div);
});
