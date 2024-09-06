import React from 'react';
import {
    ResponsiveContainer,
    CandlestickChart as RechartsCandle,
    XAxis,
    YAxis,
    Tooltip,
    Candlestick,
} from 'recharts';

const CandlestickChart: React.FC<{ data: any }> = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <RechartsCandle data={data.data}>
                <XAxis dataKey="x" />
                <YAxis domain={['auto', 'auto']} />
                <Tooltip />
                <Candlestick />
            </RechartsCandle>
        </ResponsiveContainer>
    );
};

export default CandlestickChart;
