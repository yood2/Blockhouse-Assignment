'use client';

import React from 'react';
import * as d3 from 'd3';
import BaseChartD3 from './BaseChart';

interface BarChartProps {
    data: { label: string; value: number }[];
    width: number;
    height: number;
}

const BarChartD3: React.FC<BarChartProps> = ({ data, width, height }) => {
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const render = (
        svg: d3.Selection<SVGGElement, unknown, null, undefined>
    ) => {
        const x = d3
            .scaleBand()
            .range([0, innerWidth])
            .padding(0.1)
            .domain(data.map((d) => d.label));

        const y = d3
            .scaleLinear()
            .range([innerHeight, 0])
            .domain([0, d3.max(data, (d) => d.value) || 0]);

        svg.append('g')
            .attr('transform', `translate(0,${innerHeight})`)
            .call(d3.axisBottom(x))
            .selectAll('text')
            .attr('transform', 'translate(-10,0)rotate(-45)')
            .style('text-anchor', 'end');

        svg.append('g').call(d3.axisLeft(y));

        svg.selectAll('.bar')
            .data(data)
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('x', (d) => x(d.label) || 0)
            .attr('y', (d) => y(d.value))
            .attr('width', x.bandwidth())
            .attr('height', (d) => innerHeight - y(d.value))
            .attr('fill', 'steelblue');
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

export default BarChartD3;
