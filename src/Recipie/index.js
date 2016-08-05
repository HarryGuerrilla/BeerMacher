import React from 'react';
import Fermentables from './Fermentables'

export default ({recipie, ...props}) => (
  <div>
    <h1>
      {recipie.name}
    </h1>
    <ul>
      <li> Batch Size: {recipie.batch_size} </li>
      <li> Boil Size: {recipie.boil_size} </li>
    <Fermentables fermentables={recipie.fermentables.fermentable} />
    </ul>
  </div>
);
