import * as data from '../../assets/paleAle.json'

export default function(state = [], action) {
  let recipes = data.recipes.map(({ id, name }) => {
    return { id, name }
  })

  switch(action.type) {
    default:
      return [...recipes]
  }
}
