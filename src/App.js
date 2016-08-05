import React, { Component } from 'react';
import './App.css';
import Recipie from './Recipie';

var PaleAle = require('json!../paleAle.json');

PaleAle = PaleAle.recipes.recipe[0];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = PaleAle;
  }
  render() {
    return (
      <div className="App">
        <Recipie recipie={this.state} />
        <div>
          {JSON.stringify(this.state)}
        </div>
      </div>
    );
  }
}

export default App;
