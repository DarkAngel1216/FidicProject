import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Phase 1',
    budget: 10000000,
    actual: 8500000,
  },
  {
    name: 'Phase 2',
    budget: 12000000,
    actual: 11000000,
  },
  {
    name: 'Phase 3',
    budget: 15000000,
    actual: 16000000,
  },
];

export function FinancialSummary() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="budget" fill="#8884d8" />
        <Bar dataKey="actual" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
}
