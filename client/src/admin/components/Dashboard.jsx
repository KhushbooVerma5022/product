import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const token = sessionStorage.getItem("token");
      const res = await fetch("http://localhost:2000/admin/dashboard/products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();

      const labels = json.data.map((d) => d.category);
      const values = json.data.map((d) => d.count);

      setStats(json.data);

      setData({
        labels,
        datasets: [
          {
            data: values,
            backgroundColor: [
              "#EF4444",
              "#10B981",
              "#F59E0B",
              "#3B82F6",
              "#8B5CF6",
              "#14B8A6",
            ],
            borderColor: "#fff",
            borderWidth: 2,
          },
        ],
      });

      setLoading(false);
    }

    load();
  }, []);

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">
        Product Listings by Category
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white p-6 rounded-lg shadow">
          {loading ? (
            <div className="flex justify-center py-24">
              <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
            </div>
          ) : (
            <Doughnut
              data={data}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: "bottom", labels: { color: "#374151" } },
                },
              }}
            />
          )}
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4 text-gray-700">
            Category Detail
          </h2>
          <ul className="space-y-2 text-gray-600">
            {stats.map((item, idx) => (
              <li key={idx} className="flex justify-between">
                <span>{item.category}</span>
                <span className="font-semibold">{item.count}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
