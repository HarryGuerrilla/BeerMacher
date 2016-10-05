import React, { Component } from 'react'
import formatUnit from '../format-units'
import { Panel, Table, Button, Glyphicon } from 'react-bootstrap'
import tools from '../recipe-helpers'
import './index.css'

const recipes = require('../paleAle.json')

class Recipe extends Component {

  constructor(props) {
    super(props)

    this.state = {
      recipe: recipes.recipes[this.props.params.id],
      edit: {
        field: '',
      },
      batch_size_tmp: '',
    }
  }

  get abv() {
    let data = {
      og: this.og,
      fg: this.fg
    }
    let abv = tools.abv(data)
    return formatUnit(abv, { major_unit: '%'})
  }

  get bitternessRatio() {
    let data = {
      og: this.og,
      ibus: this.ibus
    }
    let r = tools.bitternessRatio(data)
    return formatUnit(r, { round: 0.01 })
  }

  get batch_size() {
    return formatUnit(this.state.recipe.batch_size, { major_unit: 'gal' })
  }

  get boil_time() {
    return formatUnit(this.state.recipe.boil_time, { major_unit: 'min' })
  }

  get boilSize() {
    let data = {
      batch_size: this.state.recipe.batch_size,
      equipment: this.state.recipe.equipment,
      boil_time: this.state.recipe.boil_time
    }
    let vol = tools.boilVolume(data)
    return formatUnit(vol, { major_unit: 'gal' })
  }

  get efficiency() {
    return formatUnit(this.state.recipe.efficiency, { major_unit: '%' })
  }

  get fg() {
    let data = {
      yeasts: this.state.recipe.yeasts,
      og: this.og
    }
    let g = tools.finalGravity(data)
    return formatUnit(g, { round: 0.001 })
  }

  get ibus() {
    let data = {
      hops: this.state.recipe.hops,
      og: this.og,
      batch_size: this.state.recipe.batch_size
    }
    let ibus = tools.calculateIBUs(data)
    return formatUnit(ibus, { round: 1 })
  }

  get name() {
    return this.state.recipe.name
  }

  get og() {
      let g =  tools.calcOriginalGravity(this.state.recipe)
      return formatUnit(g, { round: 0.001 })
  }

  get pbOG() {
    let data = {
      og: this.og,
      equipment: this.state.recipe.equipment,
      boil_size: this.boil_size,
      batch_size: this.state.recipe.batch_size
    }
    let g = tools.calcPreBoilGravity(data)
    return formatUnit(g, { round: 0.001 })
  }

  get srm() {
    let data = {
      fermentables: this.state.recipe.fermentables,
      batch_size: this.state.recipe.batch_size,
      equipment: this.state.recipe.equipment
    }
    let srm = tools.srm(data)
    return formatUnit(srm, { round: 0.1 })
  }

  get style() {
    return {
      name: this.state.recipe.style.name,
      og_min: formatUnit(this.state.recipe.style.og_min, { round: 0.001 }),
      og_max: formatUnit(this.state.recipe.style.og_max, { round: 0.001 }),
      fg_min: formatUnit(this.state.recipe.style.fg_min, { round: 0.001 }),
      fg_max: formatUnit(this.state.recipe.style.fg_max, { round: 0.001 }),
      ibu_min: formatUnit(this.state.recipe.style.ibu_min, { round: 1 }),
      ibu_max: formatUnit(this.state.recipe.style.ibu_max, { round: 1 }),
      color_min: formatUnit(this.state.recipe.style.color_min, { round: 0.1 }),
      color_max: formatUnit(this.state.recipe.style.color_max, { round: 0.1 }),
      abv_min: formatUnit(this.state.recipe.style.abv_min, { major_unit: '%' }),
      abv_max: formatUnit(this.state.recipe.style.abv_max, { major_unit: '%' }),
    }
  }

  get totalGrains() {
    let w = tools.totalAmount(this.state.recipe.fermentables)
    return formatUnit(w, { major_unit: 'lb'})
  }

  get totalHops() {
    let w = tools.totalAmount(this.state.recipe.hops)
    return formatUnit(w, { major_unit: 'oz' })
  }

  get version() {
    return this.state.recipe.version
  }

  editField(field) {
    this.setState({ edit: { field: field }})
  }

  onNameChange(event) {
    let recipe = this.state.recipe
    recipe.name = event.target.value
    this.setState({ edit: { field: 'name' },
                    recipe: recipe })
  }

  saveValue(event) {
    let recipe = this.state.recipe
    if (event.key === "Enter") {
      this.setState({ edit: { field: ''},
                      recipe: recipe })
    }
  }

  saveValueOnBlur(event) {
    let recipe = this.state.recipe
    this.setState({ edit: { field: ''},
                    recipe: recipe })
  }

  onBatchChange(event) {
    this.setState({ batch_size_tmp: event.target.value })
  }

  fmtBoilSizeForSave(bs) {
    bs = bs.split(' ')
    bs = formatUnit(bs[0], { save: true, major_unit: bs[1] || 'gal' })
    return bs
  }

  saveBatchValue(event) {
    let recipe = this.state.recipe
    if (event.key === "Enter") {
      let bs = this.state.batch_size_tmp ||
               formatUnit(recipe.batch_size, { major_unit: 'gal'})
      recipe.batch_size = this.fmtBoilSizeForSave(bs)
      recipe.boil_size = tools.boilVolume(recipe)
      this.setState({ edit: { field: '' },
                      recipe: recipe,
                      batch_size_tmp: '',
                    })
    }
  }

  saveBatchValueOnBlur() {
    let recipe = this.state.recipe
    let bs = this.state.batch_size_tmp ||
             formatUnit(recipe.batch_size, { major_unit: 'gal'})
    recipe.batch_size = this.fmtBoilSizeForSave(bs)
    recipe.boil_size = tools.boilVolume(recipe)
    this.setState({ edit: { field: '' },
                    recipe: recipe,
                    batch_size_tmp: '',
    })
  }

  render() {
    const recipeName = () => {
      return(
        <h2 className="title">
          { this.state.edit.field === 'name' ? (
              <input value={ this.name }
                     onKeyPress={this.saveValue.bind(this)}
                     onChange={ this.onNameChange.bind(this) }
                     onBlur={ this.saveValueOnBlur.bind(this) }
                     autoFocus />
          ) : (
            <span> { this.name }
              <Button bsStyle="link"
                      onClick={ this.editField.bind(this, 'name') }>
                <Glyphicon glyph="pencil" /></Button>
            </span>
            )}
        </h2>
      )
    }

    const batchSize = () => {
      let bs = this.state.batch_size_tmp || this.batch_size
      return(
        <div>
        { this.state.edit.field === 'batch_size' ? (
          <input value={ bs }
                 onChange={ this.onBatchChange.bind(this) }
                 onKeyPress={ this.saveBatchValue.bind(this) }
                 onBlur={ this.saveBatchValueOnBlur.bind(this)}
                 autoFocus />
        ) : (
          <div>
            { this.batch_size }
            <Button bsStyle="link"
                    bsSize="xsmall"
                    onClick={ this.editField.bind(this, 'batch_size') }>
              <Glyphicon glyph="pencil" />
            </Button>
          </div>
        )}
        </div>
      )
    }

    return (
      <Panel>
        <header>
          { recipeName() }
          <p>Ver. { this.version }</p>
        </header>
        <Panel header="Style Characteristics">
          <h3>{ this.style.name }</h3>
          <Table condensed bordered>
            <thead>
              <tr>
                <th></th>
                <th>Recipe</th>
                <th>Style</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Original Gravity:</th>
                <td>{ this.og }</td>
                <td>{ this.style.og_min } - { this.style.og_max }</td>
              </tr>
              <tr>
                <th>Final Gravity:</th>
                <td>{ this.fg }</td>
                <td>{ this.style.fg_min } - { this.style.fg_max }</td>
              </tr>
              <tr>
                <th>ABV:</th>
                <td>{ this.abv }</td>
                <td>{ this.style.abv_min } - { this.style.abv_max }</td>
              </tr>
              <tr>
                <th>IBUs:</th>
                <td>{ this.ibus }</td>
                <td>{ this.style.ibu_min } - { this.style.ibu_max }</td>
              </tr>
              <tr>
                <th>Bitterness Ratio:</th>
                <td>{ this.bitternessRatio }</td>
                <td></td>
              </tr>
              <tr>
                <th>SRM:</th>
                <td>{ this.srm }</td>
                <td>{ this.style.color_min } - { this.style.color_max }</td>
              </tr>
            </tbody>
          </Table>
        </Panel>
        <Panel header="Batch Info">
          <Table condensed bordered>
            <tbody>
              <tr>
                <th>Estimated Efficiency:</th>
                <td>{ this.efficiency }</td>
              </tr>
              <tr>
                <th>Batch Size:</th>
                <td>{ batchSize() }</td>
              </tr>
              <tr>
                <th>Boil Size:</th>
                <td>{ this.boil_size }</td>
              </tr>
              <tr>
                <th>Pre-Boil Gravity:</th>
                <td>{ this.pbOG }</td>
              </tr>
              <tr>
                <th>Boil Time:</th>
                <td>{ this.boil_time }</td>
              </tr>
              <tr>
                <th>Total Grains:</th>
                <td>{ this.totalGrains }</td>
              </tr>
              <tr>
                <th>Total Hops:</th>
                <td>{ this.totalHops }</td>
              </tr>
            </tbody>
          </Table>
        </Panel>
      </Panel>
    )
  }

}

export default Recipe
