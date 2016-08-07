import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import classNames from 'classnames';
import './App.css';
import Recipie from './Recipie';

var PaleAle = require('json!../paleAle.json');

PaleAle = PaleAle.recipes[0];

class App extends Component {
  constructor(props) {
    super(props);
    PaleAle.dataIn = false;
    this.state = PaleAle;

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
      <div className="container App">
        <Recipie recipie={this.state} />
        <div className="text-left" >
          <Button onClick={ this.toggleData }>View State</Button>
        </div>
        <div className={dataClass}>
          <pre className="text-left">
            {JSON.stringify(this.state, null, 2)}
          </pre>
        </div>
      </div>
    );
  }
}

export default App;
