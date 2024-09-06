'use client';

import React from 'react';
import * as d3 from 'd3';
import BaseChartD3 from './BaseChart';

interface PieChartProps {
    data: { label: string; value: number }[];
    width: number;
    height: number;
}

const PieChartD3: React.FC<PieChartProps> = ({ data, width, height }) => {
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    const radius = Math.min(innerWidth, innerHeight) / 2;

    const render = (
        svg: d3.Selection<SVGGElement, unknown, null, undefined>
    ) => {
        const color = d3.scaleOrdinal(d3.schemeCategory10);

        const pie = d3
            .pie<{ label: string; value: number }>()
            .value((d) => d.value);

        const arc = d3
            .arc<d3.PieArcDatum<{ label: string; value: number }>>()
            .innerRadius(0)
            .outerRadius(radius);

        const arcs = pie(data);

        svg.attr(
            'transform',
            `translate(${innerWidth / 2},${innerHeight / 2})`
        );

        svg.selectAll('path')
            .data(arcs)
            .enter()
            .append('path')
            .attr('d', arc)
            .attr('fill', (d, i) => color(`${i}`));

        svg.selectAll('text')
            .data(arcs)
            .enter()
            .append('text')
            .attr('transform', (d) => `translate(${arc.centroid(d)})`)
            .attr('text-anchor', 'middle')
            .text((d) => d.data.label);
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

export default PieChartD3;
