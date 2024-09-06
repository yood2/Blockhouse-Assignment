'use client';

import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

interface BaseChartProps {
    width: number;
    height: number;
    margin: { top: number; right: number; bottom: number; left: number };
    render: (svg: d3.Selection<SVGGElement, unknown, null, undefined>) => void;
}

const BaseChartD3: React.FC<BaseChartProps> = ({
    width,
    height,
    margin,
    render,
}) => {
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (svgRef.current) {
            d3.select(svgRef.current).selectAll('*').remove();
            const svg = d3
                .select(svgRef.current)
                .attr('width', width)
                .attr('height', height)
                .append('g')
                .attr('transform', `translate(${margin.left},${margin.top})`);

            render(svg);
        }
    }, [width, height, margin, render]);

    return <svg ref={svgRef}></svg>;
};

export default BaseChartD3;
