'use client';

import React from 'react';
import * as d3 from 'd3';
import BaseChartD3 from './BaseChart';

interface CandlestickData {
    date: Date;
    open: number;
    high: number;
    low: number;
    close: number;
}

interface CandlestickChartProps {
    data: CandlestickData[];
    width: number;
    height: number;
}

const CandlestickChartD3: React.FC<CandlestickChartProps> = ({
    data,
    width,
    height,
}) => {
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const render = (
        svg: d3.Selection<SVGGElement, unknown, null, undefined>
    ) => {
        const x = d3
            .scaleBand()
            .range([0, innerWidth])
            .padding(0.1)
            .domain(data.map((d) => d.date.toISOString()));

        const y = d3
            .scaleLinear()
            .range([innerHeight, 0])
            .domain([
                d3.min(data, (d) => d.low) || 0,
                d3.max(data, (d) => d.high) || 0,
            ]);

        svg.append('g')
            .attr('transform', `translate(0,${innerHeight})`)
            .call(d3.axisBottom(x));

        svg.append('g').call(d3.axisLeft(y));

        svg.selectAll('.candlestick')
            .data(data)
            .enter()
            .append('line')
            .attr(
                'x1',
                (d) => (x(d.date.toISOString()) || 0) + x.bandwidth() / 2
            )
            .attr(
                'x2',
                (d) => (x(d.date.toISOString()) || 0) + x.bandwidth() / 2
            )
            .attr('y1', (d) => y(d.low))
            .attr('y2', (d) => y(d.high))
            .attr('stroke', 'black');

        svg.selectAll('.candle')
            .data(data)
            .enter()
            .append('rect')
            .attr('x', (d) => x(d.date.toISOString()) || 0)
            .attr('y', (d) => y(Math.max(d.open, d.close)))
            .attr('width', x.bandwidth())
            .attr('height', (d) => Math.abs(y(d.open) - y(d.close)))
            .attr('fill', (d) => (d.open > d.close ? 'red' : 'green'));
    };

    return (
        <BaseChartD3
            width={width}
            height={height}
            margin={margin}
            render={render}
        />
    );
};

export default CandlestickChartD3;
