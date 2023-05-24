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
    const barColors = [];
    for (const v of vacations){
      xValues.push(v.destination);
      yValues.push(v.followersCount);
      barColors.push("green");
    }

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
            text: "Vacations popularity",
          },
        } as any,
      });
    }
  }, []);

  return <div className="graphBox"><canvas ref={chartRef} className="Graph"></canvas></div>;
}

export default Graph;
