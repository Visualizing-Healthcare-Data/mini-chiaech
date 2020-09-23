import React, {Component} from 'react';
import * as d3 from 'd3';
import IceCreamTest from './IceCreamTest.csv';

class BarChart extends React.Component {
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

      const svg = d3.select("body").append("svg")
        .attr("width", this.props.width)
        .attr("height", this.props.height)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

      svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xAxis))

      svg.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(yAxis))

      svg.selectAll("bar")
        .data(data)
        .enter()
        .append("rect")
        .style("fill", "steelblue")
        .attr("x", function(d) { return xAxis(d.Temperature); })
        .attr("width", xAxis.bandwidth())
        .attr("y", function(d) { return yAxis(d.Revenue); })
        .attr("height", function(d) { return height - yAxis(d.Revenue); })
        .attr("fill", function(d) {
          return "rgb(0, 0, " + Math.round((d.out_temperature * 155)+100) + ")"; })
    });
  }

  render(){
    return <div id={"#" + this.props.id}></div>
  }
}

export default BarChart;
