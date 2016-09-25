import React, { Component } from 'react';
import Fermentables from './Fermentables';
import Hops from './Hops';
import formatUnit from '../format-units';
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap';
import './index.css';

const recipes = require('json!../../paleAle.json');

const totalFermentableWeight = (recipe) => {
  let totalWeight = 0;
  recipe.fermentables.map((grain) => {
    totalWeight += parseFloat(grain.amount);
    console.log(grain.amount);
    return(totalWeight);
  });
  return(totalWeight);
};

export default class Recipe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipes: recipes.recipes
    }
  }

  render() {
    const recipe = this.state.recipes[this.props.params.id];
    const totalWeight = totalFermentableWeight(recipe);

    return (
      <Panel>
        <h2 className="title">{ recipe.name }</h2>
        <ListGroup>
          <ListGroupItem header="Batch Size">
            {formatUnit({amount: recipe.batch_size + 'L', major_unit: 'gal', minor_unit: 'floz'})}
          </ListGroupItem>
          <ListGroupItem header="Boil Size">
            {formatUnit({amount: recipe.boil_size + 'L', major_unit: 'gal', minor_unit: 'floz'})}
          </ListGroupItem>
          <Fermentables fermentables={recipe.fermentables} totalWeight={totalWeight} />
          <Hops hops={ recipe.hops } />
        </ListGroup>
      </Panel>
    );
  }

};
