'use client';

import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

interface ChartData {
    labels: string[];
    data: number[];
}

const PieChart: React.FC = () => {
    const [chartData, setChartData] = useState<ChartData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const chartInstance = useRef<Chart | null>(null);

    const generateColors = (numColors: number) => {
        const colors = [];
        for (let i = 0; i < numColors; i++) {
            const hue = (i * 137.508) % 360; // Use golden angle approximation
            colors.push(`hsla(${hue}, 70%, 60%, 0.7)`);
        }
        return colors;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    'http://127.0.0.1:8000/api/pie-chart-data/'
                );
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setChartData(data);
            } catch (e) {
                setError('Failed to fetch data');
                console.error('Error:', e);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (chartData && chartRef.current) {
            const ctx = chartRef.current.getContext('2d');

            if (ctx) {
                // Destroy existing chart if it exists
                if (chartInstance.current) {
                    chartInstance.current.destroy();
                }

                const colors = generateColors(chartData.labels.length);

                // Create new chart
                chartInstance.current = new Chart(ctx, {
                    type: 'pie',
                    data: {
                        labels: chartData.labels,
                        datasets: [
                            {
                                data: chartData.data,
                                backgroundColor: colors,
                            },
                        ],
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                            title: {
                                display: true,
                                text: 'Pie Chart',
                            },
                        },
                    },
                });
            }
        }

        // Cleanup function
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [chartData]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!chartData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <canvas ref={chartRef} />
        </div>
    );
};

export default PieChart;
