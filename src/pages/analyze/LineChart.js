import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import "./LineChart.css";

const LineChart = () => {
  const refChart = useRef();
  const parseData = d3.timeParse("%Y-%m-%dT%H");
  useEffect(() => {
    // get data
    fetch("https://data.cityofnewyork.us/resource/tg4x-b46p.json")
      .then((response) => response.json())
      .then((data) => {
        const times = [
          ...new Set(data.map((each) => each.enteredon.slice(0, 13))),
        ];

        // count every time
        let CountsByTime = [];
        times.map((time) => {
          let the_time = time;
          let count = 0;
          data.map((each) => {
            let timestamp = each.enteredon.slice(0, 13);
            if (timestamp === the_time) count += 1;
          });
          const counts = { time: parseData(the_time), count: count };
          CountsByTime.push(counts);
        });
        console.log(CountsByTime);

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

        // Set up chart
        const svg = d3
          .select(refChart.current)
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .style("background-color", "rgb(0,0,0,0.6)")
          .append("g")
          .attr(
            "transform",
            "translate(" + margin.left + "," + margin.top + ")"
          );

        // x - axis
        const x = d3
          .scaleTime()
          .domain(
            d3.extent(CountsByTime, function (d) {
              return d.time;
            })
          )
          .range([0, width]);
        svg
          .append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x));

        // y - axis
        const max = d3.max(CountsByTime, function (d) {
          return d.count;
        });
        const y = d3.scaleLinear().domain([0, max]).range([height, 0]);
        svg.append("g").call(d3.axisLeft(y));
        
        // graph
        svg
          .append("path")
          .datum(CountsByTime)
          .attr("fill", "none")
          .attr("stroke", "white")
          .attr("stroke-width", 3)
          .attr(
            "d",
            d3
              .line()
              .x(function (d) {
                return x(d.time);
              })
              .y(function (d) {
                return y(d.count);
              })
          );
      });
  });

  return (
    <div id="d3demo">
      <svg ref={refChart}></svg>
    </div>
  );
};

export default LineChart;
