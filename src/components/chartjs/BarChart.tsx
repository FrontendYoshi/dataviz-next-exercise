"use client"; // Sagt dem Code, dass dies eine Client-Seite ist, also wird dieser Code im Browser ausgeführt.

import { useEffect, useRef } from "react"; // Importiert die React-Hooks "useEffect" und "useRef". "useRef" wird für die Referenz auf das Canvas-Element genutzt, und "useEffect" sorgt dafür, dass der Code nach dem Rendern ausgeführt wird.

import {
  Chart as ChartJS, // Importiert Chart.js und seine verschiedenen Bausteine, um Diagramme zu erstellen.
  CategoryScale, // Ein Baustein von Chart.js für die x-Achse, z.B. für Tage oder Kategorien.
  LinearScale, // Ein Baustein von Chart.js für die y-Achse, um numerische Werte darzustellen.
  BarElement, // Ein Baustein von Chart.js, um Balken für das Diagramm zu erzeugen.
  Title, // Ein Baustein von Chart.js, um einen Titel zum Diagramm hinzuzufügen.
  Tooltip, // Ein Baustein von Chart.js für Info-Boxen, die erscheinen, wenn man mit der Maus über einen Punkt fährt.
  Legend, // Ein Baustein von Chart.js, um eine Legende zu zeigen (die Erklärung, was die Farben im Diagramm bedeuten).
  BarController, // Ein Baustein von Chart.js, um ein Balkendiagramm zu erstellen.
  LineController, // Ein Baustein von Chart.js, um ein Liniendiagramm zu erstellen.
  PointElement, // Ein Baustein von Chart.js, um Punkte im Liniendiagramm zu zeichnen.
  LineElement, // Ein Baustein von Chart.js, um die Linie im Liniendiagramm zu zeichnen.
} from "chart.js"; // Importiert die einzelnen Bausteine von Chart.js.

ChartJS.register(
  CategoryScale, // Wir registrieren alle Bausteine, die wir für das Diagramm brauchen.
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
  data: { day: number; calories: number }[]; // Definiert den Typ der "data"-Eigenschaft. "data" ist ein Array von Objekten, die den Tag und die Kalorien enthalten.
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null); // Erstellt eine Referenz auf das Canvas-Element. Hier wird später das Diagramm gezeichnet.

  useEffect(() => { // "useEffect" sorgt dafür, dass dieser Code nach dem Rendern der Komponente ausgeführt wird.
    // Überprüft, ob die Referenz auf das Canvas-Element verfügbar ist.
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return; // Wenn kein Canvas-Element vorhanden ist, bricht der Code hier ab.

    // Wenn ein Diagramm bereits existiert, wird es zerstört, damit kein neues Diagramm das alte überschreibt.
    if (ChartJS.instances[ctx.canvas.id]) {
      ChartJS.instances[ctx.canvas.id].destroy();
    }

    // Erstellt ein neues Chart.js-Diagramm mit den angegebenen Daten.
    new ChartJS(ctx, {
      type: "line", // Das Diagramm wird ein Liniendiagramm (line) sein.
      data: {
        labels: data.map((d) => `Day ${d.day}`), // Die Beschriftungen für die x-Achse (z.B. "Day 1", "Day 2").
        datasets: [
          {
            label: "Kalorien (kcal)", // Der Titel des Datensatzes (was die Daten darstellen).
            data: data.map((d) => d.calories), // Die Kalorienwerte für jedes Datum.
            backgroundColor: "rgba(54, 162, 235, 0.5)", // Die Hintergrundfarbe der Linienpunkte (blau mit etwas Transparenz).
            borderColor: "rgba(75, 192, 192, 1)", // Die Farbe der Linie (grün).
          },
        ],
      },
      options: {
        scales: {
          y: { beginAtZero: true }, // Setzt die y-Achse so, dass sie bei Null beginnt.
        },
      },
    });
  }, [data]); // Der Code wird immer dann ausgeführt, wenn sich die "data"-Eigenschaft ändert.

  return <canvas ref={canvasRef} id="barChartCanvas" />; // Gibt ein Canvas-Element zurück, auf dem das Diagramm gezeichnet wird. Die Referenz auf das Canvas wird hier durch "canvasRef" verbunden.
};

export default BarChartBasic; // Exportiert die Komponente, damit sie in anderen Teilen der Anwendung verwendet werden kann.
