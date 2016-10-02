import React, { Component } from 'react';
import formatUnit from '../format-units';
import { Panel, Table, Button, Glyphicon } from 'react-bootstrap';
import tools from '../recipe-helpers';
import './index.css';

const recipes = require('../paleAle.json');

class Recipe extends Component {

  constructor(props) {
    super(props);

    this.state = {
      recipe: recipes.recipes[this.props.params.id],
      edit: {
        field: '',
      },
      batch_size_tmp: '',
    }
  }

  og(data) {
      let g =  tools.calcOriginalGravity(data);
      return formatUnit(g, { round: 0.001 });
  }

  pbOG(data) {
    data.og = tools.calcOriginalGravity(data);
    data.trub_chiller_loss = data.equipment.trub_chiller_loss;
    data.boil_size = tools.boilVolume(data);
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

  boilSize(data) {
    let vol = tools.boilVolume(data);
    return formatUnit(vol, { major_unit: 'gal' });
  }

  editField(field) {
    this.setState({ edit: { field: field }});
  }

  onNameChange(event) {
    let recipe = this.state.recipe;
    recipe.name = event.target.value;
    this.setState({ edit: { field: 'name' },
                    recipe: recipe });
  }

  saveValue(event) {
    let recipe = this.state.recipe;
    if (event.key === "Enter") {
      this.setState({ edit: { field: ''},
                      recipe: recipe })
    }
  }

  saveValueOnBlur(event) {
    let recipe = this.state.recipe;
    this.setState({ edit: { field: ''},
                    recipe: recipe });
  }

  onBatchChange(event) {
    this.setState({ batch_size_tmp: event.target.value });
  }

  fmtBoilSizeForSave(bs) {
    bs = bs.split(' ');
    bs = formatUnit(bs[0], { save: true, major_unit: bs[1] || 'gal' });
    return bs;
  }

  saveBatchValue(event) {
    let recipe = this.state.recipe;
    if (event.key === "Enter") {
      let bs = this.state.batch_size_tmp || formatUnit(recipe.batch_size, { major_unit: 'gal'});
      recipe.batch_size = this.fmtBoilSizeForSave(bs);
      recipe.boil_size = tools.boilVolume(recipe);
      this.setState({ edit: { field: '' },
                      recipe: recipe,
                      batch_size_tmp: '',
                    });
    }
  }

  saveBatchValueOnBlur() {
    let recipe = this.state.recipe;
    let bs = this.state.batch_size_tmp ||
             formatUnit(recipe.batch_size, { major_unit: 'gal'});
    recipe.batch_size = this.fmtBoilSizeForSave(bs);
    recipe.boil_size = tools.boilVolume(recipe);
    this.setState({ edit: { field: '' },
                    recipe: recipe,
                    batch_size_tmp: '',
    });
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
    const boil_size = this.boilSize(this.state.recipe);
    const boil_time = formatUnit(this.state.recipe.boil_time,
                                 { major_unit: 'min' });
    const efficiency = formatUnit(this.state.recipe.efficiency,
                                  { major_unit: '%'});

    const recipeName = () => {
      if (this.state.edit.field === 'name') {
        return(
          <h2 className="title">
            <input value={ name }
                   onKeyPress={this.saveValue.bind(this)}
                   onChange={ this.onNameChange.bind(this) }
                   onBlur={ this.saveValueOnBlur.bind(this) }
                   autoFocus />
          </h2>
        );
      } else {
        return(
          <h2 className="title">
            { name }
            <Button bsStyle="link"
                    onClick={ this.editField.bind(this, 'name') }>
              <Glyphicon glyph="pencil" /></Button>
          </h2>
        );
      }
    }

    const batchSize = () => {
      let bs = this.state.batch_size_tmp || batch_size
      if (this.state.edit.field === 'batch_size') {
        return(
          <input value={ bs }
                 onChange={ this.onBatchChange.bind(this) }
                 onKeyPress={ this.saveBatchValue.bind(this) }
                 onBlur={ this.saveBatchValueOnBlur.bind(this)}
                 autoFocus />
        );
      } else {
        return(
          <div>
            { batch_size }
            <Button bsStyle="link"
                    bsSize="xsmall"
                    onClick={ this.editField.bind(this, 'batch_size') }>
              <Glyphicon glyph="pencil" />
            </Button>
          </div>
        );
      }
    }

    return (
      <Panel>
        <header>
          { recipeName() }
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
                <td>{ batchSize() }</td>
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

export default Recipe;
