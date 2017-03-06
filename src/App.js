import React, { Component } from 'react';
import { Button, Navbar } from 'react-bootstrap';
import { connect } from 'react-redux';
import classNames from 'classnames';
import './App.css';
import RecipeList from './Recipes/RecipeList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataIn: false,
      recipes: props.recipes
    };

    this.toggleData = this.toggleData.bind(this);
  }
  toggleData() {
    this.setState({dataIn: !this.state.dataIn});
  }
  get appData() {
    return { recipes: [...this.props.recipes],
             recipe: this.props.recipe }
  }
  render() {
    const dataClass = classNames({
      in: this.state.dataIn,
      collapse: true,
      'col-sm-12': true,
    });
    return (
      <div>
        <Navbar role="navigation" fixedTop={ true }>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Recipes</a>
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>
        <div className="container App">
          <div className="col-sm-4">
            <RecipeList  />
          </div>
          <div className="col-sm-8">
            { this.props.children }
          </div>
          <div className="col-sm-12" >
            <Button onClick={ this.toggleData }>View State</Button>
          </div>
          <div className={dataClass}>
            <pre className="text-left">
              {JSON.stringify(this.appData, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    recipes: state.recipes,
    recipe: state.recipe
  }
}

export default connect(mapStateToProps)(App)
