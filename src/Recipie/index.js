import React from 'react';
import Fermentables from './Fermentables'

export default ({recipie, ...props}) => (
  <div className="row">
    <h1>
      {recipie.name}
    </h1>
    <ul className="unstyled">
      <li> Batch Size: {recipie.batch_size} </li>
      <li> Boil Size: {recipie.boil_size} </li>
    <Fermentables fermentables={recipie.fermentables} />
    </ul>
  </div>
);
