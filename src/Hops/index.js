import React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';
import formatUnits from '../../format-units';

export default ({ hops }) => (
  <div className="span6">
    <h2>Hops</h2>
    <table className="table table-hover table-bordered table-condensed">
      <thead>
        <tr>
          <th>Hop</th>
          <th>Use</th>
          <th>Time</th>
          <th>Weight</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {hops.map(hop => (
          <tr>
            <td>{hop.name}</td>
            <td>{hop.use}</td>
            <td>
              {formatUnits({ amount: hop.time + 'min', major_unit: 'min' })}
            </td>
            <td>
              {formatUnits({ amount: hop.amount + 'kg', major_unit: 'oz' })}
            </td>
            <td>
              <Button className="btn-mini"><Glyphicon glyph="trash" /></Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
