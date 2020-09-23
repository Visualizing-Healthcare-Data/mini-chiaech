import React, {Component} from 'react';
import * as d3 from 'd3';
import IceCreamTest from './IceCreamTest.csv';

class ScatterPlot extends React.Component {
  componentDidMount() {
    this.drawChart();
  }

  drawChart() {
    const data = this.props.data;
    const svgWidth = this.props.width;
    const svgHeight = this.props.height;

    //Note: getting width and height from a variable rather than the elements attribute e.g. svg.attr("width")
    const margin = { top: 20, right: 20, bottom: 30, left: 40 },
      width = svgWidth - margin.left - margin.right,
      height = svgHeight - margin.top - margin.bottom;


    d3.csv(IceCreamTest).then((data) => {
      console.log(data);

      const xAxis = d3.scaleBand()
        .rangeRound([0, width])
        .padding(0.1)

      const yAxis = d3.scaleLinear()
        .rangeRound([height, 0]);

      xAxis.domain(data.map(function(d) { return d.Temperature; }));
      yAxis.domain([0, d3.max(data, function(d) { return d.Revenue; })]);

      var svg = d3.select("body")
        .append("svg")
        .attr("width", this.props.width)
        .attr("height", this.props.height)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

      // Add X axis
      var x = d3.scaleLinear()
        .domain([0, 4000])
        .range([ 0, width ]);
      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xAxis));

      // Add Y axis
      var y = d3.scaleLinear()
        .domain([0, 500000])
        .range([ height, 0]);
      svg.append("g")
        .call(d3.axisLeft(yAxis));

        xAxis.domain(data.map(function(d) { return d.Temperature; }));
        yAxis.domain([0, d3.max(data, function(d) { return d.Revenue; })]);

      // Add dots
      svg.append('g')
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
          .attr("cx", function (d) { return xAxis(d.Temperature); } )
          .attr("cy", function (d) { return yAxis(d.Revenue); } )
          .attr("r", 5)
          .style("fill", "steelblue")
    });
  }

  render(){
    return <div id={"#" + this.props.id}></div>
  }
}

export default ScatterPlot;
