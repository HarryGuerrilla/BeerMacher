import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux';
import RecipeReducer from './reducer_recipe'

const rootReducer = combineReducers({
  recipes: RecipeReducer,
  routing: routerReducer,
})

export default rootReducer
