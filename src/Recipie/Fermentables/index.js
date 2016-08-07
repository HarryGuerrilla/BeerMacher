import React from 'react';
import Qty from 'js-quantities';
import { Button } from 'react-bootstrap';

const amountToLb = (amount) => {
  let qty = new Qty(amount + 'kg');
  return(qty.to('lb').toPrec('0.025 lb').toString());
}

export default ({fermentables}) => (
  <div className="span6">
    <h2>Fermentables</h2>
    <table className="table table-hover table-bordered table-condensed">
      <thead>
        <tr>
          <th>Fermentable</th>
          <th>Weight</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
      {fermentables.map((fermentable) =>
        <tr key={fermentable.name}>
          <td>{fermentable.name}</td>
          <td>{amountToLb(fermentable.amount)}</td>
          <td><Button className="btn-mini"><i className="icon-trash" /></Button></td>
        </tr>
      )}
    </tbody>
  </table>
</div>
);
