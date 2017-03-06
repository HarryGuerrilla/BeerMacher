import React, { Component } from 'react'
import formatUnit from '../helpers/format-units'
import { Panel, Table, Button, Glyphicon } from 'react-bootstrap'
import { connect } from 'react-redux';
import Fermentables from '../Fermentables';
import { selectRecipe } from './actions/recipe_actions.js'

import tools from '../helpers/recipe-helpers'
import './index.css'

class Recipe extends Component {

  componentWillMount() {
    this.props.selectRecipe(this.props.params.id)
  }

  get abv() {
    if (this.og === 'N/A' || this.fg  === 'N/A') return 'N/A'
    let data = {
      og: this.og,
      fg: this.fg
    }
    let abv = tools.abv(data)
    return formatUnit(abv, { major_unit: '%'})
  }

  get bitternessRatio() {
    if (this.og === 'N/A' || this.ibus === 'N/A') return 'N/A'
    let data = {
      og: this.og,
      ibus: this.ibus
    }
    let r = tools.bitternessRatio(data)
    return formatUnit(r, { round: 0.01 })
  }

  get batchSize() {
    if (!this.props.recipe.batch_size) return 'N/A'
    return formatUnit(this.props.recipe.batch_size, { major_unit: 'gal' })
  }

  get boilTime() {
    if (!this.props.recipe.boil_time) return 'N/A'
    return formatUnit(this.props.recipe.boil_time, { major_unit: 'min' })
  }

  get boilSize() {
    if (!this.props.recipe.batch_size ||
        !this.props.recipe.equipment ||
        !this.props.recipe.boil_time) {
      return 'N/A'
    }
    let data = {
      batch_size: this.props.recipe.batch_size,
      equipment: this.props.recipe.equipment,
      boil_time: this.props.recipe.boil_time
    }
    let vol = tools.boilVolume(data)
    return formatUnit(vol, { major_unit: 'gal' })
  }

  get efficiency() {
    if (!this.props.recipe.efficiency) return 'N/A'
    return formatUnit(this.props.recipe.efficiency, { major_unit: '%' })
  }

  get fg() {
    if (!this.props.recipe.yeasts) return 'N/A'
    let data = {
      yeasts: this.props.recipe.yeasts,
      og: this.og
    }
    let g = tools.finalGravity(data)
    return formatUnit(g, { round: 0.001 })
  }

  get ibus() {
    if(!this.props.recipe.hops || !this.props.recipe.batch_size) {
      return 'N/A'
    }
    let data = {
      hops: this.props.recipe.hops,
      og: this.og,
      batch_size: this.props.recipe.batch_size
    }
    let ibus = tools.calculateIBUs(data)
    return formatUnit(ibus, { round: 1 })
  }

  get name() {
    if (!this.props.recipe.name) return 'Untitled'
    return this.props.recipe.name
  }

  get og() {
    if (!this.props.recipe.fermentables) return 'N/A'
    let g =  tools.calcOriginalGravity(this.props.recipe)
    return formatUnit(g, { round: 0.001 })
  }

  get pbOG() {
    if(!this.props.recipe.equipment || !this.props.recipe.batch_size) {
      return 'N/A'
    }
    let data = {
      og: this.og,
      equipment: this.props.recipe.equipment,
      boil_size: this.boilSize,
      batch_size: this.props.recipe.batch_size
    }
    let g = tools.calcPreBoilGravity(data)
    return formatUnit(g, { round: 0.001 })
  }

  get srm() {
    if(!this.props.recipe.fermentables ||
       !this.props.recipe.batch_size ||
       !this.props.recipe.equipment) {
      return 'N/A'
    }
    let data = {
      fermentables: this.props.recipe.fermentables,
      batch_size: this.props.recipe.batch_size,
      equipment: this.props.recipe.equipment
    }
    let srm = tools.srm(data)
    return formatUnit(srm, { round: 0.1 })
  }

  get style() {
    if (!this.props.recipe.style) {
      return {
        name: 'No Style Selected',
        og_min: 'N/A',
        og_max: '',
        fg_min: 'N/A',
        fg_max: '',
        ibu_min: 'N/A',
        ibu_max: '',
        color_min: 'N/A',
        color_max: '',
        abv_min: 'N/A',
        abv_max: '',
      }
    }
    return {
      name: this.props.recipe.style.name,
      og_min: formatUnit(this.props.recipe.style.og_min, { round: 0.001 }),
      og_max: formatUnit(this.props.recipe.style.og_max, { round: 0.001 }),
      fg_min: formatUnit(this.props.recipe.style.fg_min, { round: 0.001 }),
      fg_max: formatUnit(this.props.recipe.style.fg_max, { round: 0.001 }),
      ibu_min: formatUnit(this.props.recipe.style.ibu_min, { round: 1 }),
      ibu_max: formatUnit(this.props.recipe.style.ibu_max, { round: 1 }),
      color_min: formatUnit(this.props.recipe.style.color_min, { round: 0.1 }),
      color_max: formatUnit(this.props.recipe.style.color_max, { round: 0.1 }),
      abv_min: formatUnit(this.props.recipe.style.abv_min, { major_unit: '%' }),
      abv_max: formatUnit(this.props.recipe.style.abv_max, { major_unit: '%' }),
    }
  }

  get totalGrains() {
    if (!this.props.recipe.fermentables) return 'N/A'
    let w = tools.totalAmount(this.props.recipe.fermentables)
    return formatUnit(w, { major_unit: 'lb'})
  }

  get totalHops() {
    if (!this.props.recipe.hops) return 'N/A'
    let w = tools.totalAmount(this.props.recipe.hops)
    return formatUnit(w, { major_unit: 'oz' })
  }

  get version() {
    if (!this.props.recipe.version) return 0
    return this.props.recipe.version
  }

  fmtBoilSizeForSave(bs) {
    bs = bs.split(' ')
    bs = formatUnit(bs[0], { save: true, major_unit: bs[1] || 'gal' })
    return bs
  }

  render() {
    if (!this.props.recipe.id) {
      return(<div>Loading...</div>)
    }

    const recipeName = () => {
      if(this.name) {
        return(
          <div>
            <h2 className="title">
              <span> { this.name }
                <Button bsStyle="link">
                  <Glyphicon glyph="pencil" />
                </Button>
              </span>
            </h2>
            <p>Ver. { this.version }</p>
          </div>
        )
      } else {
        return 'Add Recipe Name'
      }
    }

    const batchSize = () => {
      let bs = this.props.batch_size_tmp || this.batchSize
      return(
        <div>
          <div>
            { bs }
            <Button bsStyle="link"
                    bsSize="xsmall">
              <Glyphicon glyph="pencil" />
            </Button>
          </div>
        </div>
      )
    }

    const styleCharacteristics = () => {
      return (
        <div>
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
        </div>
      )
    }

    const recipeFermentables = () => {
      if (!this.props.recipe.fermentables){
        return 'Add Fermentables'
      }
      return (
        <Fermentables fermentables={ this.props.recipe.fermentables } />
      )
    }

    return (
      <Panel>
        <header>
          { recipeName() }
        </header>
        <Panel header="Style Characteristics">
          { styleCharacteristics() }
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
                <td>{ this.boilSize }</td>
              </tr>
              <tr>
                <th>Pre-Boil Gravity:</th>
                <td>{ this.pbOG }</td>
              </tr>
              <tr>
                <th>Boil Time:</th>
                <td>{ this.boilTime }</td>
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
        <Panel header="Fermentables">
          { recipeFermentables() }
        </Panel>
      </Panel>
    )
  }

}

function mapStateToProps(state) {
  return {
    recipe: state.recipe
  }
}

export default connect(mapStateToProps, { selectRecipe })(Recipe)
