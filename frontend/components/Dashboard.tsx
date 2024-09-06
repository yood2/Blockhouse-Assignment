'use client';

import React, { useEffect, useState } from 'react';
import CandlestickChart from './charts/CandlestickChart';
import LineChart from './charts/LineChart';
import BarChart from './charts/BarChart';
import PieChart from './charts/PieChart';
import styles from './Dashboard.css';

const Dashboard: React.FC = () => {
    const [candlestickData, setCandlestickData] = useState<any>(null);
    const [lineChartData, setLineChartData] = useState<any>(null);
    const [barChartData, setBarChartData] = useState<any>(null);
    const [pieChartData, setPieChartData] = useState<any>(null);

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

                setCandlestickData(candlestick);
                setLineChartData(line);
                setBarChartData(bar);
                setPieChartData(pie);
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
                {candlestickData ? (
                    <CandlestickChart data={candlestickData} />
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            <div className={styles.chartContainer}>
                <h2>Line Chart</h2>
                {lineChartData ? (
                    <LineChart data={lineChartData} />
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            <div className={styles.chartContainer}>
                <h2>Bar Chart</h2>
                {barChartData ? (
                    <BarChart data={barChartData} />
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            <div className={styles.chartContainer}>
                <h2>Pie Chart</h2>
                {pieChartData ? (
                    <PieChart data={pieChartData} />
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
