import React, { Component } from 'react';
import formatUnit from '../format-units';
import { Panel, ListGroup, ListGroupItem, Table } from 'react-bootstrap';
import tools from '../recipe-helpers';
import './index.css';

const recipes = require('json!../../paleAle.json');

export default class Recipe extends Component {

  constructor(props) {
    super(props);

    this.state = {
      recipe: recipes.recipes[this.props.params.id],
    }
  }

  componentWillMount(props) {
    let recipe = this.state.recipe;
    this.data = {
      efficiency: recipe.efficiency,
      batch_size: recipe.batch_size,
      fermentables: recipe.fermentables,
      trub_chiller_loss: recipe.equipment.trub_chiller_loss,
      boil_size: recipe.boil_size,
      yeasts: recipe.yeasts,
      display_batch_size: formatUnit({amount: recipe.batch_size + 'L', major_unit: 'gal' }),
      display_boil_size: formatUnit({amount: recipe.boil_size + 'L', major_unit: 'gal'}),
      boil_time: Math.round(recipe.boil_time) + ' min',
      display_efficiency: Math.round(recipe.efficiency) + '%',
      hops: recipe.hops,
    }
  }

  og() {
      let g =  tools.calcOriginalGravity(this.data);
      return Math.round(g * 1000)/1000;
  }

  pbOG() {
    this.data.og = this.og();
    let g = tools.calcPreBoilGravity(this.data);
    return Math.round(g * 1000)/1000;
  }

  fg() {
    this.data.og = this.og();
    let g = tools.finalGravity(this.data);
    return Math.round(g * 1000)/1000;
  }

  abv() {
    this.data.fg = this.fg();
    let abv = tools.abv(this.data);
    return Math.round(abv * 10)/10 + '%';
  }

  srm() {
    let srm = tools.srm(this.data);
    return Math.round(srm * 10)/10;
  }

  totalGrains() {
    let w = tools.totalAmount(this.data.fermentables);
    return formatUnit({amount: w + 'kg', major_unit: 'lb'});
  }

  totalHops() {
    let w = tools.totalAmount(this.data.hops);
    return formatUnit({amount: w + 'kg', major_unit: 'oz' });
  }

  bitternessRatio() {
    this.data.ibus = tools.calculateIBUs(this.data);
    let r = tools.bitternessRatio(this.data);
    return Math.round(r * 100)/100;
  }

  ibus() {
    let ibus = tools.calculateIBUs(this.data);
    return Math.round(ibus);
  }

  render() {
    const recipe = this.state.recipe;
    return (
      <Panel>
        <header>
          <h2 className="title">{ recipe.name }</h2>
          <p>Ver. {recipe.version}</p>
        </header>
        <Panel header="Style Characteristics">
          <h3>{ this.state.recipe.style.name }</h3>
          <Table condensed bordered>
            <tbody>
              <tr>
                <th>Original Gravity:</th>
                <td>{ this.og() }</td>
              </tr>
              <tr>
                <th>Final Gravity:</th>
                <td>{ this.fg() }</td>
              </tr>
              <tr>
                <th>ABV:</th>
                <td>{ this.abv() }</td>
              </tr>
              <tr>
                <th>IBUs:</th>
                <td>{ this.ibus() }</td>
              </tr>
              <tr>
                <th>Bitterness Ratio:</th>
                <td>{ this.bitternessRatio() }</td>
              </tr>
              <tr>
                <th>SRM:</th>
                <td>{ this.srm() }</td>
              </tr>
            </tbody>
          </Table>
        </Panel>
        <Panel header="Batch Info">
          <Table condensed bordered>
            <tbody>
              <tr>
                <th>Estimated Efficiency:</th>
                <td>{ this.data.display_efficiency }</td>
              </tr>
              <tr>
                <th>Batch Size:</th>
                <td>{ this.data.display_batch_size }</td>
              </tr>
              <tr>
                <th>Boil Size:</th>
                <td>{ this.data.display_boil_size }</td>
              </tr>
              <tr>
                <th>Pre-Boil Gravity:</th>
                <td>{ this.pbOG() }</td>
              </tr>
              <tr>
                <th>Boil Time:</th>
                <td>{ this.data.boil_time }</td>
              </tr>
              <tr>
                <th>Total Grains:</th>
                <td>{ this.totalGrains() }</td>
              </tr>
              <tr>
                <th>Total Hops:</th>
                <td>{ this.totalHops() }</td>
              </tr>
            </tbody>
          </Table>
        </Panel>
      </Panel>
    );
  }

};
