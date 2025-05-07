"use client";
import { Chart } from "chart.js";
import {
  CategoryScale,
  Chart,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
} from "chart.js";
import { useState } from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale, // X-Achse
  LinearScale, // Y-Achse
  PointElement, // Punkte
  LineElement, // Linien
  LineController // Controller für Linien
);

export default function WeatherPage() {
  // Daten von API erhalten

  //useState
  const [weatherData, setWeatherData] = useState<any>(null); // any ist immer, wenn wir typescript sagen es ist egal was drin ist, typescript gibt mir dann da aber auch keine fehlermeldung
  //useEffect
  //fetch

  // Daten vorbereiten?

  if (!weatherData){
    return <div>Loading</div>;
  }
  // Daten an die Chart-Komponente übergeben
  return (
    <Line
      data={{
        labels: [],
        datasets: [
          {
            label: "Temperatur",
            data: [],
          },
        ],
      }}
    />
  );
}
