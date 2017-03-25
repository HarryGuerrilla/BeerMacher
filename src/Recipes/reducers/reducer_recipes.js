import { GET_ALL_RECIPE_NAMES } from '../actions/recipe_actions'


export default function(state = [], action) {
  switch(action.type) {
    case GET_ALL_RECIPE_NAMES:
      return action.recipe_names
    default:
      return state
  }
}
