import React, { Component } from 'react';
import './App.css';
import Recipie from './Recipie';

var PaleAle = require('json!../paleAle.json');

PaleAle = PaleAle.recipes[0];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = PaleAle;
  }
  render() {
    return (
      <div className="container App">
        <Recipie recipie={this.state} />
        <div>
          <pre className="text-left">
            {JSON.stringify(this.state, null, 2)}
          </pre>
        </div>
      </div>
    );
  }
}

export default App;
