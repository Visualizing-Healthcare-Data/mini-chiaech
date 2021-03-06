import React, { Component } from 'react'
import logo from './logo.svg';
import './App.css';
import BarChart from './BarChart.js';
import ScatterPlot from './ScatterPlot.js';
import LineGraph from './LineGraph.js';

class App extends Component {

  state = {
    width: 700,
    height: 500,
    id: "root"
  }

  render() {
    return (
      <div className="App">
        <BarChart data={this.state.data} width={this.state.width} height={this.state.height} />
        <ScatterPlot data={this.state.data} width={this.state.width} height={this.state.height} />
        <LineGraph data={this.state.data} width={this.state.width} height={this.state.height} />
      </div>
    );
  }
}

export default App;
