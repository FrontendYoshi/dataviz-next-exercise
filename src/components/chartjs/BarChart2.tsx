"use client"; // Sagt dem Code, dass dies eine Client-Seite ist und keine Server-Seite. Das bedeutet, dass der Code im Browser läuft.

import { Line as LineChart } from "react-chartjs-2"; // Importiert die "Line"-Komponente von "react-chartjs-2", die verwendet wird, um Diagramme darzustellen.

import {
  Chart as ChartJS, // Importiert die verschiedenen Teile von Chart.js, einem Diagramm-Tool.
  CategoryScale, // Ein Chart.js-Element für die x-Achse (z.B. für Tage oder Kategorien).
  LinearScale, // Ein Chart.js-Element für die y-Achse (z.B. für Zahlen oder Werte).
  BarElement, // Ein Chart.js-Element für Balkendiagramme.
  Title, // Ein Element für den Titel des Diagramms.
  Tooltip, // Ein Element für kleine Infos, die angezeigt werden, wenn man über einen Punkt im Diagramm geht.
  Legend, // Ein Element, das eine Legende für das Diagramm zeigt.
  BarController, // Ein Element, das die Steuerung für das Balkendiagramm ermöglicht.
  LineController, // Ein Element, das die Steuerung für das Liniendiagramm ermöglicht.
  PointElement, // Ein Element für die Punkte, die im Liniendiagramm angezeigt werden.
  LineElement, // Ein Element für die Linien im Liniendiagramm.
} from "chart.js"; // Hier importieren wir alle notwendigen Teile von Chart.js, um Diagramme zu erstellen.

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
); // Hier registrieren wir alle diese Elemente bei Chart.js, damit sie im Diagramm verwendet werden können.

const BarChartBasic = ({
  data,
}: {
  data: { day: number; calories: number }[]; // Definiert den Typ der "data"-Eigenschaft. Es ist ein Array von Objekten, das den Tag (day) und die Kalorien (calories) enthält.
}) => {
  return (
    <LineChart // Hier verwenden wir die "LineChart"-Komponente, um ein Diagramm darzustellen.
      data={{
        labels: data.map((d) => `Day ${d.day}`), // Erzeugt die Beschriftungen auf der x-Achse (z.B. "Day 1", "Day 2", ...).
        datasets: [
          {
            label: "Kalorien (kcal)", // Der Name des Datensatzes (die Beschreibung des Diagramms).
            data: data.map((d) => d.calories), // Hier werden die Kalorienwerte für die y-Achse gesammelt.
            backgroundColor: "rgba(54, 162, 235, 0.5)", // Die Farbe der Balken im Diagramm (hier blau mit etwas Transparenz).
            borderColor: "rgba(75, 192, 192, 1)", // Die Farbe des Rahmens um die Balken (hier grün).
          },
        ],
      }}
      options={{
        scales: {
          y: { beginAtZero: true }, // Setzt die y-Achse so, dass sie bei Null beginnt.
        },
      }}
    />
  );
};

export default BarChartBasic; // Exportiert die Komponente "BarChartBasic", damit sie in anderen Teilen der Anwendung verwendet werden kann.
