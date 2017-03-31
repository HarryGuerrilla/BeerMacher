import configureStore from 'redux-mock-store';

import { SELECT_RECIPE, GET_ALL_RECIPE_NAMES } from '../actions/recipe_actions';
//import * as actions from '../actions/recipe_actions'
import * as data from '../../assets/paleAle.json';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('actions', () => {
  it('should select recipe', () => {
    const recipe = data.recipes[0];

    const initialState = {};
    const store = mockStore(initialState);

    store.dispatch({ type: SELECT_RECIPE, recipe: recipe });

    const expectedAction = {
      type: SELECT_RECIPE,
      recipe,
    };

    const actions = store.getActions();

    expect(actions).toEqual([expectedAction]);
  });

  it('should select recipe names', () => {
    const recipe_names = data.recipes.map(({ name }, id) => ({ name, id }));

    const initialState = {};
    const store = mockStore(initialState);

    store.dispatch({ type: GET_ALL_RECIPE_NAMES, recipe_names: recipe_names });

    const expectedAction = {
      type: GET_ALL_RECIPE_NAMES,
      recipe_names,
    };

    const actions = store.getActions();

    expect(actions).toEqual([expectedAction]);
  });
});
