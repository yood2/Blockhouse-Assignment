'use client';

import React from 'react';
import * as d3 from 'd3';
import BaseChartD3 from './BaseChart';

interface LineChartProps {
    data: { date: Date; value: number }[];
    width: number;
    height: number;
}

const LineChartD3: React.FC<LineChartProps> = ({ data, width, height }) => {
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const render = (
        svg: d3.Selection<SVGGElement, unknown, null, undefined>
    ) => {
        const x = d3
            .scaleTime()
            .range([0, innerWidth])
            .domain(d3.extent(data, (d) => d.date) as [Date, Date]);

        const y = d3
            .scaleLinear()
            .range([innerHeight, 0])
            .domain([0, d3.max(data, (d) => d.value) || 0]);

        const line = d3
            .line<{ date: Date; value: number }>()
            .x((d) => x(d.date))
            .y((d) => y(d.value));

        svg.append('g')
            .attr('transform', `translate(0,${innerHeight})`)
            .call(d3.axisBottom(x));

        svg.append('g').call(d3.axisLeft(y));

        svg.append('path')
            .datum(data)
            .attr('fill', 'none')
            .attr('stroke', 'steelblue')
            .attr('stroke-width', 1.5)
            .attr('d', line);
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

export default LineChartD3;
