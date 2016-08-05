import React from 'react';

export default ({fermentables}) => (
  <table>
    <thead>
    <tr>
      <th>Fermentable</th>
      <th>Weight</th>
    </tr>
    </thead>
    <tbody>
    {fermentables.map((fermentable) =>
    <tr key={fermentable.name}>
      <td>{fermentable.name}</td>
      <td>{fermentable.amount}</td>
    </tr>
    )}
  </tbody>
  </table>
);
