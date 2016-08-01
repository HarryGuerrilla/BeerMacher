import React, { Component } from 'react';
import './App.css';

var PaleAle = require('json!../paleAle.json');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = PaleAle;
  }
  render() {
    return (
      <div className="App">
        <div>
          {JSON.stringify(this.state)}
        </div>
      </div>
    );
  }
}

export default App;
