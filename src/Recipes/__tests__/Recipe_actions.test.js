import { SELECT_RECIPE } from '../actions/recipe_actions'
import * as actions from '../actions/recipe_actions'
import * as data from '../../assets/paleAle.json'

describe('actions', () => {
  it('should select recipe', () => {
    const recipe = data.recipes[0]

    const expectedAction = {
      type: SELECT_RECIPE,
      recipe
    }

    expect(actions.selectRecipe(recipe.id)).toEqual(expectedAction)
  })
})
