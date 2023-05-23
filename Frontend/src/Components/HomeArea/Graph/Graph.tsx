import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

import "./Graph.css";

function Graph(): JSX.Element {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const xValues = ["Italy", "France", "Spain", "USA", "Argentina"];
    const yValues = [55, 49, 44, 24, 15];
    const barColors = ["red", "green", "blue", "orange", "brown"];

    const ctx = chartRef.current?.getContext("2d");
    if (ctx) {
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: xValues,
          datasets: [
            {
              backgroundColor: barColors,
              data: yValues,
            },
          ],
        },
        options: {
          legend: { display: false },
          title: {
            display: true,
            text: "World Wine Production 2018",
          },
        } as any,
      });
    }
  }, []);

  return <div className="graphBox"><canvas ref={chartRef} className="Graph"></canvas></div>;
}

export default Graph;
