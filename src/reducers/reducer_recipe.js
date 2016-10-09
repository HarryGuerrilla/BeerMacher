import * as PaleAle from '../assets/paleAle.json'

export default function(state = [], action) {
  switch(action.type) {
  default:
    return [
      ...PaleAle.recipes
    ]
  }
}
