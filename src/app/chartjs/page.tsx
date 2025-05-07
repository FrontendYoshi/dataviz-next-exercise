import BarChart from "@/components/chartjs/BarChart";
import BarChart2 from "@/components/chartjs/BarChart2";

export default function ChartJSExamples() {

  const data = [
    { day: 1, calories: 2500 },
    { day: 2, calories: 3000 },
    { day: 3, calories: 2000 },
    { day: 4, calories: 2200 },
    { day: 5, calories: 2300 },
    { day: 6, calories: 2600 },
    { day: 7, calories: 3500 },
  ];

  return (
    <div>
      <BarChart data={data} />
      <BarChart2 data={data} />

    </div>
  );
}
// über bsp Barchart2 mit Mouse dann quick fix und import