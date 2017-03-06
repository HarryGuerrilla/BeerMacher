import * as data from '../../assets/paleAle.json'

export const SELECT_RECIPE = 'SELECT_RECIPE'

export function selectRecipe(recipe_id) {
  let recipe = data.recipes.find((recipe) => {
    return recipe.id === recipe_id
  })

  console.log('fetching recipe...', recipe.name)

  return {
    type: SELECT_RECIPE,
    recipe
  }
}
