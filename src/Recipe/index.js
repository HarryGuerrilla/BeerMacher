import React from 'react';
import Fermentables from './Fermentables';
import Hops from './Hops';
import formatUnit from '../format-units';

const totalFermentableWeight = (recipe) => {
  let totalWeight = 0;
  recipe.fermentables.map((grain) => {
    totalWeight += parseFloat(grain.amount);
    console.log(grain.amount);
    return(totalWeight);
  });
  return(totalWeight);
};

export default ({recipe, ...props}) => {
  const totalWeight = totalFermentableWeight(recipe);
  return (
  <div className="row">
    <h1>
      {recipe.name}
    </h1>
    <ul className="unstyled">
    <li> Batch Size: {formatUnit({amount: recipe.batch_size + 'L', major_unit: 'gal', minor_unit: 'floz'})} </li>
      <li> Boil Size: {formatUnit({amount: recipe.boil_size + 'L', major_unit: 'gal', minor_unit: 'floz'})} </li>
      <Fermentables fermentables={recipe.fermentables} totalWeight={totalWeight} />
    <Hops hops={ recipe.hops } />
    </ul>
  </div>
  );
};
