import { SELECT_RECIPE } from '../actions/recipe_actions'

const INITIAL_STATE = {}

export default function(state=INITIAL_STATE, action) {
  switch(action.type) {
    case SELECT_RECIPE:
      return action.recipe
  default:
      return state
  }
}
