"use client";

import { useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  BarController,
  LineController,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,

  PointElement,
  LineElement,
  LineController,

  Title,
  Tooltip,
  Legend
);

const BarChartBasic = ({
  data,
}: {
  data: { day: number; calories: number }[];
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Check if the canvas reference is available
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    // Destroy any existing chart instance to avoid duplication
    if (ChartJS.instances[ctx.canvas.id]) {
      ChartJS.instances[ctx.canvas.id].destroy();
    }

    // Create the chart
    new ChartJS(ctx, {
      type: "line",
      data: {
        labels: data.map((d) => `Day ${d.day}`),
        datasets: [
          {
            label: "Kalorien (kcal)",
            data: data.map((d) => d.calories),
            backgroundColor: "rgba(54, 162, 235, 0.5)",
            borderColor: "rgba(75, 192, 192, 1)",
          },
        ],
      },
      options: {
        scales: {
          y: { beginAtZero: true },
        },
      },
    });
  }, [data]);

  return <canvas ref={canvasRef} id="barChartCanvas" />;
};

export default BarChartBasic;
