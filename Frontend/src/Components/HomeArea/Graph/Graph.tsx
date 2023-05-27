import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

import "./Graph.css";
import { vacationsStore } from "../../../Redux/VacationsState";

function Graph(): JSX.Element {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const vacations = vacationsStore.getState().vacations;
    const xValues = [];
    const yValues = [];
    for (const v of vacations) {
      xValues.push(v.destination);
      yValues.push(v.followersCount);
    }

    const maxCount = Math.max(...yValues); // Find the maximum integer value in yValues

    const ctx = chartRef.current?.getContext("2d");
    if (ctx) {
      new Chart(ctx, {
        type: "bar",
        data: { labels: xValues, datasets: [ { data: yValues} ] },
        options: { plugins: {
          title: {display: true, text: "Vacations popularity"}, 
          legend: {display: true}} 
        },
      });
    }
  }, []);

  return (
    <div className="graphBox">
      <h2>Followers statistics</h2>
      <br />
      <canvas ref={chartRef} className="Graph"></canvas>
    </div>
  );
}

export default Graph;
