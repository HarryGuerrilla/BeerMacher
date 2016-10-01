import React, { Component } from 'react';
import formatUnit from '../format-units';
import { Panel, Table } from 'react-bootstrap';
import tools from '../recipe-helpers';
import './index.css';

const recipes = require('../paleAle.json');

export default class Recipe extends Component {

  constructor(props) {
    super(props);

    this.state = {
      recipe: recipes.recipes[this.props.params.id],
    }
  }

  og(data) {
      let g =  tools.calcOriginalGravity(data);
      return formatUnit(g, { round: 0.001 });
  }

  pbOG(data) {
    data.og = tools.calcOriginalGravity(data);
    data.trub_chiller_loss = data.equipment.trub_chiller_loss;
    let g = tools.calcPreBoilGravity(data);
    return formatUnit(g, { round: 0.001 });
  }

  fg(data) {
    data.og = this.og(data);
    let g = tools.finalGravity(data);
    return formatUnit(g, { round: 0.001 });
  }

  abv(data) {
    data.fg = this.fg(data);
    let abv = tools.abv(data);
    return formatUnit(abv, { major_unit: '%'});
  }

  srm(data) {
    let srm = tools.srm(data);
    return formatUnit(srm, { round: 0.1 });
  }

  totalGrains(data) {
    let w = tools.totalAmount(data.fermentables);
    return formatUnit(w, { major_unit: 'lb'});
  }

  totalHops(data) {
    let w = tools.totalAmount(data.hops);
    return formatUnit(w, { major_unit: 'oz' });
  }

  bitternessRatio(data) {
    data.og = tools.calcOriginalGravity(data);
    data.ibus = tools.calculateIBUs(data);
    let r = tools.bitternessRatio(data);
    return formatUnit(r, { round: 0.01 });
  }

  ibus(data) {
    let ibus = tools.calculateIBUs(data);
    return formatUnit(ibus, { round: 1 });
  }

  render() {
    const name = this.state.recipe.name;
    const version = this.state.recipe.version;
    const style = this.state.recipe.style.name;
    const og = this.og(this.state.recipe);
    const fg = this.fg(this.state.recipe);
    const pbOG = this.pbOG(this.state.recipe);
    const abv = this.abv(this.state.recipe);
    const srm = this.srm(this.state.recipe);
    const totalGrains = this.totalGrains(this.state.recipe);
    const totalHops = this.totalHops(this.state.recipe);
    const bitternessRatio = this.bitternessRatio(this.state.recipe);
    const ibus = this.ibus(this.state.recipe);
    const batch_size = formatUnit(this.state.recipe.batch_size,
                                  { major_unit: 'gal' });
    const boil_size = formatUnit(this.state.recipe.boil_size,
                                 { major_unit: 'gal'});
    const boil_time = formatUnit(this.state.recipe.boil_time,
                                 { major_unit: 'min' });
    const efficiency = formatUnit(this.state.recipe.efficiency,
                                  { major_unit: '%'});

    return (
      <Panel>
        <header>
          <h2 className="title">{ name }</h2>
          <p>Ver. { version }</p>
        </header>
        <Panel header="Style Characteristics">
          <h3>{ style }</h3>
          <Table condensed bordered>
            <tbody>
              <tr>
                <th>Original Gravity:</th>
                <td>{ og }</td>
              </tr>
              <tr>
                <th>Final Gravity:</th>
                <td>{ fg }</td>
              </tr>
              <tr>
                <th>ABV:</th>
                <td>{ abv }</td>
              </tr>
              <tr>
                <th>IBUs:</th>
                <td>{ ibus }</td>
              </tr>
              <tr>
                <th>Bitterness Ratio:</th>
                <td>{ bitternessRatio }</td>
              </tr>
              <tr>
                <th>SRM:</th>
                <td>{ srm }</td>
              </tr>
            </tbody>
          </Table>
        </Panel>
        <Panel header="Batch Info">
          <Table condensed bordered>
            <tbody>
              <tr>
                <th>Estimated Efficiency:</th>
                <td>{ efficiency }</td>
              </tr>
              <tr>
                <th>Batch Size:</th>
                <td>{ batch_size }</td>
              </tr>
              <tr>
                <th>Boil Size:</th>
                <td>{ boil_size }</td>
              </tr>
              <tr>
                <th>Pre-Boil Gravity:</th>
                <td>{ pbOG }</td>
              </tr>
              <tr>
                <th>Boil Time:</th>
                <td>{ boil_time }</td>
              </tr>
              <tr>
                <th>Total Grains:</th>
                <td>{ totalGrains }</td>
              </tr>
              <tr>
                <th>Total Hops:</th>
                <td>{ totalHops }</td>
              </tr>
            </tbody>
          </Table>
        </Panel>
      </Panel>
    );
  }

};
