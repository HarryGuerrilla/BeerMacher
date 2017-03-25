import database from '../../Database'

export const SELECT_RECIPE = 'SELECT_RECIPE'
export const GET_ALL_RECIPE_NAMES = 'GET_ALL_RECIPE_NAMES'

export function selectRecipe(recipe_id) {
  let recipe_url = `/users/recipes/${recipe_id}`

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

export function getAllRecipeNames() {
  let recipes_url = '/users/recipes'

  console.log('fetching all recipe names')

  return dispatch => {
    return database.ref(recipes_url).once('value', snap => {
      let recipe_names = snap.val().map(({name}, id) => ({name, id}))
      dispatch({
        type: GET_ALL_RECIPE_NAMES,
        recipe_names
      })
    })
  }
}
