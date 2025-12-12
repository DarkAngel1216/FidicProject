import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface FinancialSummaryProps {
  data?: {
    name: string;
    budget: number;
    actual: number;
  }[];
}

const defaultData = [
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

export function FinancialSummary({ data = defaultData }: FinancialSummaryProps) {
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
        <CartesianGrid strokeDasharray="3 3" stroke="#9ca3af" opacity={0.3} />
        <XAxis dataKey="name" tick={{ fill: '#6b7280' }} />
        <YAxis tick={{ fill: '#6b7280' }} />
        <Tooltip
          contentStyle={{ backgroundColor: 'white', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
          itemStyle={{ color: '#374151' }}
        />
        <Legend />
        <Bar dataKey="budget" name="Budget" fill="#3b82f6" radius={[4, 4, 0, 0]} />
        <Bar dataKey="actual" name="Actual Spend" fill="#f59e0b" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
