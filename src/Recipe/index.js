import React from 'react';
import Fermentables from './Fermentables';
import Hops from './Hops';
import formatUnit from '../format-units';


export default ({recipe, ...props}) => (
  <div className="row">
    <h1>
      {recipe.name}
    </h1>
    <ul className="unstyled">
    <li> Batch Size: {formatUnit({amount: recipe.batch_size + 'L', major_unit: 'gal', minor_unit: 'floz'})} </li>
      <li> Boil Size: {formatUnit({amount: recipe.boil_size + 'L', major_unit: 'gal', minor_unit: 'floz'})} </li>
    <Fermentables fermentables={recipe.fermentables} />
    <Hops hops={ recipe.hops } />
    </ul>
  </div>
);
