import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import "./Chart.css";
import { DateTime } from "luxon";

// shared
import REQUEST from "REQUEST/v0";
import { DnsTwoTone, RestoreOutlined } from "@material-ui/icons";

function hashCode(str) {
  // Java String#hashCode
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

function intToRGB(i) {
  var c = (i & 0x00ffffff).toString(16).toUpperCase();

  return "#" + "00000".substring(0, 6 - c.length) + c;
}

const ScatterChart = () => {
  const refChart = useRef();
  const parseTime = d3.timeParse("%Y-%m-%dT%H:%M:%S");
  const timeFormat = "%Y-%m-%dT%H:%M:%S";
  const [signals, setSignals] = useState([]);

  useEffect(() => {
    let timeStart = DateTime.now().toUTC();
    let timeEnd = DateTime.now().toUTC();
    timeStart = timeStart.minus({ minutes: 1 });

    // get data
    REQUEST.general.getSignals({ timeSince: timeStart }).then((result) => {
      if (result.success) {
        // parse times (x axis)
        const timeLineSignal = [];
        result.signals.map((signal) => {
          timeLineSignal.push({
            // time: parseTime(signal.time.slice(0, 19)),
            time: DateTime.fromISO(signal.time),
            gateway: signal.gateway,
            bin_num: signal.bin_num,
            mag_max: signal.mag_max,
          });
        });
        setSignals(timeLineSignal);
        console.log(timeLineSignal);

        // style
        const margin = { top: 50, right: 30, bottom: 30, left: 50 };
        const container = d3.select("#chartContainer");

        let width = 0;
        let height = 0;
        try {
          width =
            parseInt(container.style("width")) - margin.left - margin.right;
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
          .attr(
            "transform",
            "translate(" + margin.left + "," + margin.top + ")"
          );

        const x = d3
          .scaleTime()
          .domain([timeStart, timeEnd])
          .nice()
          // .domain(
          //   d3.extent(timeLineSignal, function (signal) {
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
        const binMax = d3.max(timeLineSignal, (signal) => signal.bin_num);

        const y = d3
          .scaleLinear()
          .domain([0, binMax])
          // .scaleBand()
          // .domain(timeLineSignal.map((signal) => signal.gateway))
          .range([height, 0]);
        // y axis
        svg.append("g").call(d3.axisLeft(y));

        // graph
        svg
          .append("g")
          .selectAll("dot")
          .data(timeLineSignal)
          .enter()
          .append("circle")
          .attr("cx", function (signal) {
            return x(signal.time);
          })
          .attr("cy", function (signal) {
            return y(signal.bin_num);
          })
          .attr("r", 3)
          .style("fill", function (signal) {
            return intToRGB(hashCode(signal.gateway));
          });
      }
    });
  }, []);

  // console.log(signals);
  // const gatewayInfo = signals.map((signal) => {
  //   return (
  //     <div>
  //       <circle
  //         r={3}
  //         cx={0}
  //         cy={3}
  //         style={{ fill: intToRGB(hashCode(signal.gateway)) }}
  //       ></circle>
  //       <span>signal.gateway</span>
  //     </div>
  //   );
  // });

  return (
    <div id="chartContainer">
      <svg ref={refChart}></svg>
      {/* {gatewayInfo} */}
    </div>
  );
};

export default ScatterChart;
