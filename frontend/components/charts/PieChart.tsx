import React from 'react';
import {
    ResponsiveContainer,
    PieChart as RechartsPie,
    Pie,
    Tooltip,
    Cell,
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const PieChart: React.FC<{ data: any }> = ({ data }) => {
    const chartData = data.labels.map((label: string, index: number) => ({
        name: label,
        value: data.data[index],
    }));

    return (
        <ResponsiveContainer width="100%" height={300}>
            <RechartsPie>
                <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {chartData.map((entry: any, index: number) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                        />
                    ))}
                </Pie>
                <Tooltip />
            </RechartsPie>
        </ResponsiveContainer>
    );
};

export default PieChart;
