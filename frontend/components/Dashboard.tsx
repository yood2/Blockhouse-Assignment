'use client';

import React, { useEffect, useState } from 'react';
import CandlestickChart from './charts/CandlestickChart';
import LineChart from './charts/LineChart';
import BarChart from './charts/BarChart';
import PieChart from './charts/PieChart';
import styles from './Dashboard.css';

interface ChartData {
    data: any[];
    labels?: string[];
}

const Dashboard: React.FC = () => {
    const [candlestickData, setCandlestickData] = useState<any[]>([]);
    const [lineChartData, setLineChartData] = useState<any[]>([]);
    const [barChartData, setBarChartData] = useState<any[]>([]);
    const [pieChartData, setPieChartData] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [candlestick, line, bar, pie] = await Promise.all([
                    fetch('http://localhost:8000/api/candlestick-data/').then(
                        (res) => res.json()
                    ),
                    fetch('http://localhost:8000/api/line-chart-data/').then(
                        (res) => res.json()
                    ),
                    fetch('http://localhost:8000/api/bar-chart-data/').then(
                        (res) => res.json()
                    ),
                    fetch('http://localhost:8000/api/pie-chart-data/').then(
                        (res) => res.json()
                    ),
                ]);

                console.log('Raw data:', { candlestick, line, bar, pie });

                if (Array.isArray(candlestick.data)) {
                    setCandlestickData(
                        candlestick.data.map((d: any) => ({
                            ...d,
                            date: new Date(d.x),
                        }))
                    );
                } else {
                    console.error(
                        'Candlestick data is not an array:',
                        candlestick
                    );
                }

                if (Array.isArray(line.data) && Array.isArray(line.labels)) {
                    setLineChartData(
                        line.data.map((value: number, index: number) => ({
                            date: new Date(2023, index),
                            value,
                        }))
                    );
                } else {
                    console.error(
                        'Line chart data is not in expected format:',
                        line
                    );
                }

                // Process Bar Chart data
                if (Array.isArray(bar.data) && Array.isArray(bar.labels)) {
                    setBarChartData(
                        bar.data.map((value: number, index: number) => ({
                            label: bar.labels[index],
                            value,
                        }))
                    );
                } else {
                    console.error(
                        'Bar chart data is not in expected format:',
                        bar
                    );
                }

                if (Array.isArray(pie.data) && Array.isArray(pie.labels)) {
                    setPieChartData(
                        pie.data.map((value: number, index: number) => ({
                            label: pie.labels[index],
                            value,
                        }))
                    );
                } else {
                    console.error(
                        'Pie chart data is not in expected format:',
                        pie
                    );
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className={styles.dashboard}>
            <div className={styles.chartContainer}>
                <h2>Candlestick Chart</h2>
                {candlestickData.length > 0 ? (
                    <CandlestickChart
                        data={candlestickData}
                        width={400}
                        height={300}
                    />
                ) : (
                    <p>Loading Candlestick data...</p>
                )}
            </div>
            <div className={styles.chartContainer}>
                <h2>Line Chart</h2>
                {lineChartData.length > 0 ? (
                    <LineChart data={lineChartData} width={400} height={300} />
                ) : (
                    <p>Loading Line Chart data...</p>
                )}
            </div>
            <div className={styles.chartContainer}>
                <h2>Bar Chart</h2>
                {barChartData.length > 0 ? (
                    <BarChart data={barChartData} width={400} height={300} />
                ) : (
                    <p>Loading Bar Chart data...</p>
                )}
            </div>
            <div className={styles.chartContainer}>
                <h2>Pie Chart</h2>
                {pieChartData.length > 0 ? (
                    <PieChart data={pieChartData} width={400} height={300} />
                ) : (
                    <p>Loading Pie Chart data...</p>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
