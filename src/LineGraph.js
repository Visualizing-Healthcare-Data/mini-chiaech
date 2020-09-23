import React, {Component} from 'react';
import * as d3 from 'd3';
import IceCreamTest from './IceCreamTest.csv';

class LineGraph extends React.Component {
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

      const x = d3.scaleBand()
        .rangeRound([0, width])
        .padding(0.1)

      const y = d3.scaleLinear()
        .rangeRound([height, 0]);

      var valueline = d3.line()
        .x(function(d) { return x(d.Temperature); })
        .y(function(d) { return y(d.Revenue); });

      var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

      x.domain(d3.extent(data, function(d) { return d.Temperature; }));
      y.domain([0, d3.max(data, function(d) { return d.Revenue; })]);

      // Add the valueline path.
      svg.append("path")
          .data([data])
          .attr("class", "line")
          .attr("stroke-width", 2)
          .style("stroke", "steelblue")
          .attr("d", valueline);

      // Add the X Axis
      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x));

      // Add the Y Axis
      svg.append("g")
          .attr("class", "y axis")
          .call(d3.axisLeft(y));
      });
  }

  render(){
    return <div id={"#" + this.props.id}></div>
  }
}

export default LineGraph;
