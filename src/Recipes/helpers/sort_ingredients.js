// sort ingredients
// setup
// 1 water
// mash: use mash
// 2 water agent
// 3 fermentables
// 4 spice/herb/flavor
// 5 hop
// boil (by time)
// 6 water agent
// 7 hops
// 8 spice/herb/flavor/other
// 9 fining
// pitch
// 10 yeast
// post-pitch
// 11 fermentables
// 12 water agent
// 13 hops
// 14 spice/herb/flavor/other
// 15 fining

const order = {
  water: 1,
  mash: {
    water_agent: 2,
    fermentables: 3,
    spice_herb_flavor: 4,
    hop: 5,
  },
  boil: {
    water_agent: 6,
    hops: 6,
    spice_herb_flavor: 6,
    fining: 6,
  },
  pitch: {
    yeast: 10,
  },
  post_pitch: {
    fermentables: 11,
    water_agent: 12,
    hops: 13,
    spice_herb_flavor: 14,
    fining: 15,
  },
};

const sortIngredients = ({ fermentables, hops, yeasts, waters, miscs }) => {
  let ingredients = [];

  if (fermentables) {
    fermentables.map((ingredient, index) => {
      ingredient.category = 'fermentable';
      ingredient.id = index;
      ingredient.order = ingredient.add_after_boil === true
        ? order.post_pitch.fermentables
        : order.mash.fermentables;
      return ingredients.push(ingredient);
    });
  }

  if (hops) {
    hops.map((ingredient, index) => {
      ingredient.category = 'hop';
      ingredient.id = index;
      switch (ingredient.use) {
        case 'Dry Hop':
          ingredient.order = order.post_pitch.hops;
          break;
        case 'Boil':
        case 'First Wort':
        case 'Aroma':
          ingredient.order = order.boil.hops;
          break;
        case 'Mash':
          ingredient.order = order.mash.hops;
          break;
        default:
          ingredient.order = order.boil.hops;
      }
      return ingredients.push(ingredient);
    });
  }

  if (yeasts) {
    yeasts.map((ingredient, index) => {
      ingredient.category = 'yeast';
      ingredient.id = index;
      ingredient.order = order.pitch.yeast;
      return ingredients.push(ingredient);
    });
  }

  if (waters) {
    waters.map((ingredient, index) => {
      ingredient.category = 'water';
      ingredient.id = index;
      ingredient.order = order.water;
      return ingredients.push(ingredient);
    });
  }

  if (miscs) {
    miscs.map(ingredient => {
      ingredient.category = 'misc';
      switch (ingredient.use) {
        case 'Boil':
          switch (ingredient.type) {
            case 'Water Agent':
              ingredient.order = order.boil.water_agent;
              break;
            case 'Fining':
              ingredient.order = order.boil.fining;
              break;
            case 'Spice':
            case 'Herb':
            case 'Flavor':
            case 'Other':
              ingredient.order = order.boil.spice_herb_flavor;
              break;
            default:
              break;
          }
          break;
        case 'Mash':
          switch (ingredient.type) {
            case 'Water Agent':
              ingredient.order = order.mash.water_agent;
              break;
            case 'Fining':
            case 'Spice':
            case 'Herb':
            case 'Flavor':
            case 'Other':
              ingredient.order = order.mash.spice_herb_flavor;
              break;
            default:
              break;
          }
          break;
        case 'Primary':
        case 'Secondary':
          switch (ingredient.type) {
            case 'Water Agent':
              ingredient.order = order.post_pitch.water_agent;
              break;
            case 'Fining':
              ingredient.order = order.post_pitch.fining;
              break;
            case 'Spice':
            case 'Herb':
            case 'Flavor':
            case 'Other':
              ingredient.order = order.post_pitch.spice_herg_flavar;
              break;
            default:
              break;
          }
          break;
      }
      ingredients.push(ingredient);
    });
  }

  ingredients.sort((a, b) => {
    a.time = Number.parseFloat(a.time);
    a.amount = Number.parseFloat(a.amount);
    b.time = Number.parseFloat(b.time);
    b.amount = Number.parseFloat(b.amount);

    if (a.order < b.order) return -1;

    if (a.order > b.order) return 1;

    if (a.use === 'Boil') {
      if (a.time > b.time) return -1;
      if (a.time < b.time) return 1;
      if (a.category === 'misc') return -1;
      if (b.category === 'misc') return 1;
      if (a.amount < b.amount) return 1;
      if (a.amount > b.amount) return -1;
      if (a.name > b.name) return 1;
      if (a.name < b.name) return -1;
      return 0;
    } else if (a.category === 'fermentable') {
      if (a.amount < b.amount) return 1;
      if (a.amount > b.amount) return -1;
      if (a.name > b.name) return 1;
      if (a.name < b.name) return -1;
      return 0;
    }
    return 0;
  });

  return ingredients;
};

export default sortIngredients;
