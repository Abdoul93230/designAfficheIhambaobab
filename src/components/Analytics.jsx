import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function Analytics({ data }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Statistiques des publications</h2>
      <div className="overflow-x-auto">
        <BarChart width={600} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="vues" fill="#8884d8" />
          <Bar dataKey="interactions" fill="#82ca9d" />
        </BarChart>
      </div>
    </div>
  );
}