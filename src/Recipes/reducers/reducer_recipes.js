import { GET_ALL_RECIPE_NAMES, ADD_RECIPE } from '../actions/recipe_actions';

export default function(state = [], action) {
  switch (action.type) {
    case GET_ALL_RECIPE_NAMES:
      return action.recipe_names;
    case ADD_RECIPE:
      let new_recipes = {};
      action.new_recipes.forEach(recipe => {
        new_recipes[recipe.id] = recipe;
      });
      state = Object.assign(state, new_recipes);
      return {
        ...state,
        ...new_recipes,
      };
    default:
      return state;
  }
}
