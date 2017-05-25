import X2JS from 'x2js';

const allKeysToLowerCase = obj => {
  var output = {};
  for (let i in obj) {
    if (Object.prototype.toString.apply(obj[i]) === '[object Object]') {
      output[i.toLowerCase()] = allKeysToLowerCase(obj[i]);
    } else {
      output[i.toLowerCase()] = obj[i];
    }
  }
  return output;
};

const beerXML2json = xml => {
  const x2js = new X2JS({
    arrayAccessFormPaths: [
      'RECIPES.RECIPE',
      'RECIPES.RECIPE.FERMENTABLES.FERMENTABLE',
      'RECIPES.RECIPE.HOPS.HOP',
      'RECIPES.RECIPE.MISCS.MISC',
      'RECIPES.RECIPE.YEASTS.YEAST',
    ],
  });
  let beerXMLrecipes = x2js.xml2js(xml);

  beerXMLrecipes = allKeysToLowerCase(beerXMLrecipes);

  let output = { recipes: beerXMLrecipes.recipes.recipe };

  output.recipes.forEach((recipe, index) => {
    recipe = allKeysToLowerCase(recipe);
    recipe.fermentables = allKeysToLowerCase(recipe.fermentables.fermentable);
    recipe.hops = allKeysToLowerCase(recipe.hops.hop);
    recipe.miscs = allKeysToLowerCase(recipe.miscs.misc);
    recipe.yeasts = allKeysToLowerCase(recipe.yeasts.yeast);
    output.recipes[index] = recipe;
  });

  return output;
};

export default beerXML2json;
