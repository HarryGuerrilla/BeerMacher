import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import RecipeReducer from './Recipes/reducers/reducer_recipe';
import RecipeListReducer from './Recipes/reducers/reducer_recipes';
import RecipeImportReducer from './RecipeImport/reducers/dialog_reducer';

const rootReducer = combineReducers({
  recipe: RecipeReducer,
  recipes: RecipeListReducer,
  routing: routerReducer,
  showRecipeImport: RecipeImportReducer,
});

export default rootReducer;
