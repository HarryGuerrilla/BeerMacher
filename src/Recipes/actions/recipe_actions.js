import database from '../../Database'

export const SELECT_RECIPE = 'SELECT_RECIPE'

export function selectRecipe(recipe_id) {
  let recipe_url = `/users/recipes/${recipe_id - 1}`

  console.log('fetching recipe...')

  return dispatch => {
    return database.ref(recipe_url).once('value', snap => {
      let recipe = snap.val()
      console.log(recipe.name)
      dispatch(
        {
          type: SELECT_RECIPE,
          recipe
        }
      )
    })
  }
}
