import React, { Component } from 'react';
import { Button, Navbar, Nav, NavDropdown, MenuItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import classNames from 'classnames';
import './App.css';
import RecipeList from './Recipes/RecipeList';
import ImportDialog from './RecipeImport/ImportDialog';

import { openRecipeImport } from './RecipeImport/actions/import_actions';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataIn: false,
      showRecipeImport: props.showRecipeImport,
      recipes: props.recipes,
    };

    this.toggleData = this.toggleData.bind(this);
  }

  toggleData() {
    this.setState({ dataIn: !this.state.dataIn });
  }
  get appData() {
    return {
      recipes: [...this.props.recipes],
      recipe: this.props.recipe,
    };
  }

  render() {
    const dataClass = classNames({
      in: this.state.dataIn,
      collapse: true,
      'col-sm-12': true,
    });

    return (
      <div>
        <Navbar role="navigation" fixedTop={true}>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Recipes</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavDropdown title="File" id="menu-file-dropdown">
              <MenuItem onSelect={this.props.openRecipeImport}>
                Import BeerXML
              </MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar>
        <div className="container App">
          <div className="col-sm-4">
            <RecipeList />
          </div>
          <div className="col-sm-8">
            {this.props.children}
          </div>
          <div className="col-sm-12">
            <Button onClick={this.toggleData}>View State</Button>
          </div>
          <div className={dataClass}>
            <pre className="text-left">
              {JSON.stringify(this.appData, null, 2)}
            </pre>
          </div>
        </div>
        <ImportDialog />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    recipes: state.recipes,
    recipe: state.recipe,
    showRecipeImport: state.showRecipeImport,
  };
}

export default connect(mapStateToProps, { openRecipeImport })(App);
