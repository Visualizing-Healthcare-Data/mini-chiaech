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

      // const xScale = scaleLinear()
      //   .domain(extent(data, d => d.x))
      //   .range([0, width]);
      //
      // const yScale = scaleLinear()
      //   .domain(extent(data, d => d.y))
      //   .range([height, 0]);

      var svg = d3.select("#my_dataviz")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

      // Add X axis
      var x = d3.scaleLinear()
        .domain([0, 4000])
        .range([ 0, width ]);
      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

      // Add Y axis
      var y = d3.scaleLinear()
        .domain([0, 500000])
        .range([ height, 0]);
      svg.append("g")
        .call(d3.axisLeft(y));

        x.domain(d3.extent(data, function(d) { return d.Temperature; }));
        y.domain([0, d3.max(data, function(d) { return d.Revenue; })]);

      // Add dots
      svg.append('g')
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
          .attr("cx", function (d) { return x(d.Temperature); } )
          .attr("cy", function (d) { return y(d.Revenue); } )
          .attr("r", 5)
          .style("fill", "steelblue")
})

  }

  render(){
    return <div id={"#" + this.props.id}></div>
  }
}

export default ScatterPlot;
