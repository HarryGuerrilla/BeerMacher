import React from 'react';
import Fermentables from './Fermentables';
import Hops from './Hops';

export default ({recipe, ...props}) => (
  <div className="row">
    <h1>
      {recipie.name}
    </h1>
    <ul className="unstyled">
      <li> Batch Size: {recipe.batch_size} </li>
      <li> Boil Size: {recipe.boil_size} </li>
    <Fermentables fermentables={recipe.fermentables} />
    <Hops hops={ recipe.hops } />
    </ul>
  </div>
);
