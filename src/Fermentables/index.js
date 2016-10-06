import React from 'react';
import formatUnit from '../../format-units';
import { Button, Glyphicon } from 'react-bootstrap';

export default ({fermentables, totalWeight}) => (
  <div className="span6">
    <h2>Fermentables</h2>
    <table className="table table-hover table-bordered table-condensed">
      <thead>
        <tr>
          <th>Fermentable</th>
          <th>Use</th>
          <th>%</th>
          <th>Weight</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
      {fermentables.map((fermentable) =>
        <tr key={fermentable.name}>
          <td>{fermentable.name}</td>
          <td>{fermentable.type}</td>
          <td>{Number((fermentable.amount / totalWeight)*100).toFixed(1) + '%'}</td>
                        <td>{formatUnit({ amount: fermentable.amount + 'kg',
                                          major_unit: 'lb',
                                          minor_unit: 'oz' })}</td>
          <td><Button className="btn-mini"><Glyphicon glyph="trash" /></Button></td>
        </tr>
      )}
    </tbody>
  </table>
</div>
);
