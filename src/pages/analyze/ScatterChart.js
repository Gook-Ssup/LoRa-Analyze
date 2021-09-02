import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import "./LineChart.css";

// shared
import REQUEST from "REQUEST/v0";
import { RestoreOutlined } from "@material-ui/icons";

const ScatterChart = () => {
  const refChart = useRef();
  const parseTime = d3.timeParse("%Y-%m-%dT%H:%M:%S");
  useEffect(() => {
    // get data
    REQUEST.general.getSignals().then((result) => {
      if (result.success) {
        console.log(result.signals);
      }
      // parse times (x axis)
      const timeToGateway = [];
      result.signals.map((signal) => {
        timeToGateway.push({
          time: parseTime(signal.time.slice(0, 19)),
          gateway: signal.gateway,
        });
      });

      // style
      const margin = { top: 50, right: 30, bottom: 30, left: 30 };
      const width =
        parseInt(d3.select("#d3demo").style("width")) -
        margin.left -
        margin.right;
      const height =
        parseInt(d3.select("#d3demo").style("height")) -
        margin.top -
        margin.bottom;

      // setup chart
      const svg = d3
        .select(refChart.current)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .style("background-color", "rgb(0,0,0,0.6)")
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      // x
      const x = d3
        .scaleTime()
        .domain(
          d3.extent(timeToGateway, function (signal) {
            return signal.time;
          })
        )
        .range([0, width]);
      // x axis
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

      // y
      const y = d3
        .scaleBand()
        .domain(
            timeToGateway.map( signal => signal.gateway)
        )
        .range([height, 0]);
      // y axis
      svg.append("g").call(d3.axisLeft(y));

      // graph
      svg
        .append("g")
        .selectAll("dot")
        .data(timeToGateway)
        .enter()
        .append("circle")
        .attr("cx", function (signal) {
          return x(signal.time);
        })
        .attr("cy", function (signal) {
          return y(signal.gateway);
        })
        .attr("r", 3)
        .style("fill", "#cc5342");
    });
  }, []);

  return (
    <div id="d3demo">
      <svg ref={refChart}></svg>
    </div>
  );
};

export default ScatterChart;
