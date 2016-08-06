import React from 'react';
import Qty from 'js-quantities';

const amountToLb = (amount) => {
  let qty = new Qty(amount + 'kg');
  return(qty.to('lb').toPrec('0.025 lb').toString());
}

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
         <td>{amountToLb(fermentable.amount)}</td>
       </tr>
     )}
  </tbody>
  </table>
);
