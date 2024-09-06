import React, { useEffect, useRef, useState } from 'react';

interface CandlestickData {
    x: string;
    open: number;
    high: number;
    low: number;
    close: number;
}

const CandlestickChart: React.FC = () => {
    const [chartData, setChartData] = useState<CandlestickData[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    'http://127.0.0.1:8000/api/candlestick-data/'
                );
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setChartData(data.data);
            } catch (e) {
                setError('Failed to fetch data');
                console.error('Error:', e);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (chartData && canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            if (ctx) {
                drawChart(ctx, chartData);
            }
        }
    }, [chartData]);

    const drawChart = (
        ctx: CanvasRenderingContext2D,
        data: CandlestickData[]
    ) => {
        const width = ctx.canvas.width;
        const height = ctx.canvas.height;
        const padding = { top: 20, right: 20, bottom: 20, left: 40 };

        ctx.clearRect(0, 0, width, height);

        const values = data.flatMap((d) => [d.open, d.high, d.low, d.close]);
        const minValue = Math.min(...values);
        const maxValue = Math.max(...values);

        const xScale =
            (width - padding.left - padding.right) / (data.length - 1);
        const yScale =
            (height - padding.top - padding.bottom) / (maxValue - minValue);

        // Draw axes
        ctx.beginPath();
        ctx.moveTo(padding.left, padding.top);
        ctx.lineTo(padding.left, height - padding.bottom);
        ctx.lineTo(width - padding.right, height - padding.bottom);
        ctx.stroke();

        // Draw candlesticks
        data.forEach((d, i) => {
            const x = padding.left + i * xScale;
            const open = height - padding.bottom - (d.open - minValue) * yScale;
            const close =
                height - padding.bottom - (d.close - minValue) * yScale;
            const high = height - padding.bottom - (d.high - minValue) * yScale;
            const low = height - padding.bottom - (d.low - minValue) * yScale;

            // Draw the wick
            ctx.beginPath();
            ctx.moveTo(x, high);
            ctx.lineTo(x, low);
            ctx.stroke();

            // Draw the body
            ctx.fillStyle = d.open > d.close ? 'red' : 'green';
            ctx.fillRect(
                x - 3,
                Math.min(open, close),
                6,
                Math.abs(close - open)
            );
        });

        // Draw y-axis labels
        ctx.fillStyle = 'black';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        for (let i = 0; i <= 5; i++) {
            const value = minValue + (maxValue - minValue) * (i / 5);
            const y = height - padding.bottom - (value - minValue) * yScale;
            ctx.fillText(value.toFixed(2), padding.left - 5, y);
        }

        // Draw x-axis labels (showing only first and last date for simplicity)
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText(data[0].x, padding.left, height - padding.bottom + 5);
        ctx.fillText(
            data[data.length - 1].x,
            width - padding.right,
            height - padding.bottom + 5
        );
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!chartData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <canvas ref={canvasRef} width={600} height={400} />
        </div>
    );
};

export default CandlestickChart;
