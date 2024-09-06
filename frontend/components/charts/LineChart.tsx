import React from 'react';
import { ResponsiveContainer, LineChart as RechartsLine, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const LineChart: React.FC<{ data: any }> = ({ data }) => {
  const chartData = data.labels.map((label: string, index: number) => ({
    name: label,
    value: data.data[index]
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsLine data={chartData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
      </RechartsLine>
    </ResponsiveContainer>
  );
};

export default LineChart;