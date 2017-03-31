import React from 'react';
import formatUnit from '../helpers/format-units.js';
import tools from '../helpers/recipe-helpers.js';
import { Button, Glyphicon } from 'react-bootstrap';

const fermentablePercent = (fermentable, fermentables) => {
  let pct = fermentable / tools.totalAmount(fermentables) * 100;
  return Number(pct).toFixed(1) + '%';
};

export default ({ fermentables }) => (
  <div className="span6">
    <table className="table table-hover table-bordered table-condensed">
      <thead>
        <tr>
          <th>Fermentable</th>
          <th>Use</th>
          <th>%</th>
          <th>Weight</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {fermentables.map(fermentable => (
          <tr key={fermentable.name}>
            <td>{fermentable.name}</td>
            <td>{fermentable.type}</td>
            <td>{fermentablePercent(fermentable.amount, fermentables)}</td>
            <td>
              {formatUnit(fermentable.amount, {
                major_unit: 'lb',
                minor_unit: 'oz',
              })}
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
