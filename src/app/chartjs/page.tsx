import BarChartBasic from "@/components/chartjs/BarChartBasic";

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
      <BarChartBasic data={data} />
    </div>
  );
}
