import React from 'react';
import Fermentables from './Fermentables'

export default ({recipie, ...props}) => (
  <div>
    <h1>
      {recipie.name}
    </h1>
    <ul>
      <li> Batch Size: {recipie.batchSize} </li>
      <li> Boil Size: {recipie.boilSize} </li>
    <Fermentables fermentables={recipie.fermentables} />
    </ul>
  </div>
);
