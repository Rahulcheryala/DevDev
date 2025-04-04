import { BarChart, Bar, LineChart, Line, ResponsiveContainer } from "recharts";
import { useNotificationStore } from "~/modules/notifications";
export default function Chart({ data }: { data: number[] }) {
  const {setChartType, chartType} = useNotificationStore()
  // Format data into an array of objects
  const formatedData = data.map((item, index) => ({
    name: index,
    value: item,
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      {chartType === 'bar' ? (
        <BarChart width={300} height={100} data={formatedData}>
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      ) : (
        <LineChart width={300} height={100} data={formatedData}>
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      )}
    </ResponsiveContainer>
  );
}