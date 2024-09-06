import React from 'react';
import {
    ResponsiveContainer,
    BarChart as RechartsBar,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from 'recharts';

const BarChart: React.FC<{ data: any }> = ({ data }) => {
    const chartData = data.labels.map((label: string, index: number) => ({
        name: label,
        value: data.data[index],
    }));

    return (
        <ResponsiveContainer width="100%" height={300}>
            <RechartsBar data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <Bar dataKey="value" fill="#8884d8" />
            </RechartsBar>
        </ResponsiveContainer>
    );
};

export default BarChart;
