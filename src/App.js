import React, { Component } from 'react';
import { Button, Navbar } from 'react-bootstrap';
import classNames from 'classnames';
import './App.css';
import RecipeList from './RecipeList';

const recipes = require('json!../paleAle.json');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataIn: false,
      recipes: recipes.recipes
    };

    this.toggleData = this.toggleData.bind(this);
  }
  toggleData() {
    this.setState({dataIn: !this.state.dataIn});
  }
  render() {
    const dataClass = classNames({
      in: this.state.dataIn,
      collapse: true,
    });
    return (
      <div>
        <Navbar role="navigation" fixedTop="true">
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Recipes</a>
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>
        <div className="container App">
          <div className="col-sm-4">
            <RecipeList recipes={this.state.recipes} />
          </div>
          <div className="col-sm-8">
            { this.props.children }
          </div>
          <div className="text-left" >
            <Button onClick={ this.toggleData }>View State</Button>
          </div>
          <div className={dataClass}>
            <pre className="text-left">
              {JSON.stringify(this.state, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
