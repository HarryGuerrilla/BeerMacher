import React from 'react';
import formatUnit from '../../format-units';
import { Button } from 'react-bootstrap';

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
          <td>{formatUnit({ amount: fermentable.amount + 'kg',
                            major_unit: 'lb',
                            minor_unit: 'oz' })}</td>
          <td><Button className="btn-mini"><i className="icon-trash" /></Button></td>
        </tr>
      )}
    </tbody>
  </table>
</div>
);
