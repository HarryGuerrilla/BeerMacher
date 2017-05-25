import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import FileInput from 'react-simple-file-input';
import beerXMl2json from './beerXML2json';

import { closeRecipeImport } from './actions/import_actions';
import { addRecipe } from '../Recipes/actions/recipe_actions';

function allKeysToLowerCase(obj) {
  var output = {};
  for (let i in obj) {
    if (Object.prototype.toString.apply(obj[i]) === '[object Object]') {
      output[i.toLowerCase()] = allKeysToLowerCase(obj[i]);
    } else {
      output[i.toLowerCase()] = obj[i];
    }
  }
  return output;
}

class ImportDialog extends Component {
  handleFileSelected(event, file) {
    this.props.addRecipe(beerXMl2json(event.target.result));
    this.props.closeRecipeImport();
  }

  render() {
    return (
      <Modal
        show={this.props.showRecipeImport}
        onHide={this.props.closeRecipeImport}>
        <Modal.Header closeButton>
          <Modal.Title>Select Recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FileInput
            readAs="text"
            onLoad={this.handleFileSelected.bind(this)}
          />
        </Modal.Body>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    showRecipeImport: state.showRecipeImport,
    recipes: state.recipes,
  };
}

export default connect(mapStateToProps, {
  closeRecipeImport,
  addRecipe,
})(ImportDialog);
