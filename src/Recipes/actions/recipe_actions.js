import database from '../../Database';

export const SELECT_RECIPE = 'SELECT_RECIPE';
export const GET_ALL_RECIPE_NAMES = 'GET_ALL_RECIPE_NAMES';
export const ADD_RECIPE = 'ADD_RECIPE';

const recipes_url = '/users/recipes';

export function selectRecipe(recipe_id) {
  const recipe_url = `/users/recipes/${recipe_id}`;

  console.log('fetching recipe...');

  return dispatch => {
    return database.ref(recipe_url).once('value', snap => {
      const recipe = snap.val();
      console.log(recipe.name);
      dispatch({
        type: SELECT_RECIPE,
        recipe,
      });
    });
  };
}

export function getAllRecipeNames() {
  console.log('fetching all recipe names');

  return dispatch => {
    return database.ref(recipes_url).once('value', snap => {
      let recipe_names = snap.val();
      Object.keys(snap.val()).map(key => {
        return (snap.val()[key] = { name: snap.val()[key].name });
      });
      dispatch({
        type: GET_ALL_RECIPE_NAMES,
        recipe_names,
      });
    });
  };
}

export function addRecipe(recipes) {
  console.log('saving recipe');

  recipes.recipes.forEach((recipe, index) => {
    let ref = database.ref(recipes_url).push(recipe);
    recipes.recipes[index].id = ref.key;
  });

  return {
    type: ADD_RECIPE,
    new_recipes: recipes.recipes,
  };
}
