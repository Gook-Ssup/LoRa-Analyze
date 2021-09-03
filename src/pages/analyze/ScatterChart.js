import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import "./Chart.css";

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
      const container = d3.select("#chartContainer");

      let width = 0;
      let height = 0;
      try {
        width = parseInt(container.style("width")) - margin.left - margin.right;
        height =
          parseInt(container.style("height")) - margin.top - margin.bottom;
      } catch (error) {
        console.log("can not find #chartContainer");
      }

      // setup chart
      const svg = d3
        .select(refChart.current)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .style("background-color", "rgb(0,0,0,0.6)")
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      // x
      let timeStart = new Date();
      let timeEnd = new Date(timeStart.valueOf());
      timeStart.setHours(timeStart.getHours() - 12);
      const x = d3
        .scaleTime()
        .domain([timeStart, timeEnd]).nice()
        // .domain(
        //   d3.extent(timeToGateway, function (signal) {
        //     return signal.time;
        //   })
        // )
        .range([0, width]);
      // x axis
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

      // y
      const y = d3
        .scaleBand()
        .domain(timeToGateway.map((signal) => signal.gateway))
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
    <div id="chartContainer">
      <svg ref={refChart}></svg>
    </div>
  );
};

export default ScatterChart;
