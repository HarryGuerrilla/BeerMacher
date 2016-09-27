import React, { Component } from 'react';
import formatUnit from '../format-units';
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap';
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
      display_batch_size: formatUnit(recipe.batch_size, { major_unit: 'gal' }),
      display_boil_size: formatUnit(recipe.boil_size, { major_unit: 'gal'}),
      boil_time: formatUnit(recipe.boil_time, { major_unit: 'min' }),
      display_efficiency: formatUnit(recipe.efficiency, { major_unit: '%'}),
      hops: recipe.hops,
    }
  }

  og() {
      let g =  tools.calcOriginalGravity(this.data);
      return formatUnit(g, { round: 0.001 });
  }

  pbOG() {
    this.data.og = this.og();
    let g = tools.calcPreBoilGravity(this.data);
    return formatUnit(g, { round: 0.001 });
  }

  fg() {
    this.data.og = this.og();
    let g = tools.finalGravity(this.data);
    return formatUnit(g, { round: 0.001 });
  }

  abv() {
    this.data.fg = this.fg();
    let abv = tools.abv(this.data);
    return formatUnit(abv, { major_unit: '%'});
  }

  srm() {
    let srm = tools.srm(this.data);
    return formatUnit(srm, { round: 0.1 });
  }

  totalGrains() {
    let w = tools.totalAmount(this.data.fermentables);
    return formatUnit(w, { major_unit: 'lb'});
  }

  totalHops() {
    let w = tools.totalAmount(this.data.hops);
    return formatUnit(w, { major_unit: 'oz' });
  }

  bitternessRatio() {
    this.data.ibus = tools.calculateIBUs(this.data);
    let r = tools.bitternessRatio(this.data);
    //    return Math.round(r * 100)/100;
    return formatUnit(r, { round: 0.01 })
  }

  ibus() {
    let ibus = tools.calculateIBUs(this.data);
    return formatUnit(ibus, { round: 1 });
  }

  render() {
    const recipe = this.state.recipe;
    return (
      <Panel className="col-sm-12">
        <header>
          <h2 className="title">{ recipe.name }</h2>
          <p>Ver. {recipe.version}</p>
        </header>
        <div className="row">
          <div className="col-sm-12">
            <ListGroup className="col-sm-6">
              <ListGroupItem header="Batch Size">
                { this.data.display_batch_size }
              </ListGroupItem>
              <ListGroupItem header="Boil Size">
                { this.data.display_boil_size }
              </ListGroupItem>
              <ListGroupItem header="Boil Time">
                { this.data.boil_time }
              </ListGroupItem>
              <ListGroupItem header="Estimated Efficiency">
                { this.data.display_efficiency }
              </ListGroupItem>
            </ListGroup>
            <ListGroup className="col-sm-6">
              <ListGroupItem header="Pre-Boil Gravity">{ this.pbOG() }</ListGroupItem>
              <ListGroupItem header="Original Gravity">{ this.og() }</ListGroupItem>
              <ListGroupItem header="Final Gravity">{ this.fg() }</ListGroupItem>
              <ListGroupItem header="ABV">{ this.abv() }</ListGroupItem>
              <ListGroupItem header="SRM">{ this.srm() }</ListGroupItem>
              <ListGroupItem header="Total Grains">{ this.totalGrains() }</ListGroupItem>
              <ListGroupItem header="Total Hops">{ this.totalHops() }</ListGroupItem>
              <ListGroupItem header="Bitterness Ratio">{ this.bitternessRatio() }</ListGroupItem>
              <ListGroupItem header="IBUs">{ this.ibus() }</ListGroupItem>
            </ListGroup>
          </div>
        </div>
      </Panel>
    );
  }

};
