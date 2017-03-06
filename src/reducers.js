import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux';
import RecipeReducer from './Recipes/reducers/reducer_recipe'
import RecipeListReducer from './Recipes/reducers/reducer_recipes'

const rootReducer = combineReducers({
  recipe: RecipeReducer,
  recipes: RecipeListReducer,
  routing: routerReducer,
})

export default rootReducer
