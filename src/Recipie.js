import React from 'react';

export default ({recipie, ...props}) => (
  <h1 {...props}>
    {recipie.name}
  </h1>
);
