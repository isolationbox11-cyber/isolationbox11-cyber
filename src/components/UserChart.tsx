import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

// Example data fetch
const fetchData = async () => {
  const res = await axios.get("https://jsonplaceholder.typicode.com/users");
  return res.data;
};

export default function UserChart() {
  const { data = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: fetchData,
  });

  if (isLoading) return <div>Loading chart...</div>;

  // Example: chart user name vs. id
  return (
    <div className="p-4">
      <h2 className="mb-2 text-lg font-bold">User ID Chart</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="id" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
