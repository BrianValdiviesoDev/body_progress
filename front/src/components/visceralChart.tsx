import { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';

export interface VisceralPoint {
    date: Date;
    visceral: number;
}

interface Props {
    data: VisceralPoint[];
    width: number;
    height: number;
    lineColor: string;
}

export default function VisceralChart({ data, width, height, lineColor }:Props) {
    const svgRef = useRef<SVGSVGElement | null>(null);
    const [tooltip, setTooltip] = useState<{ x: number; y: number; date: Date, visceral:number } | null>(null);

    useEffect(() => {
        if (!svgRef.current) return;

        // Clear any existing SVG content
        d3.select(svgRef.current).selectAll('*').remove();

        const margin = { top: 20, right: 30, bottom: 30, left: 40 };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        const svg = d3.select(svgRef.current)
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        // Scale functions
        const xScale = d3.scaleTime()
            .domain(d3.extent(data, d => d.date) as [Date, Date])
            .range([0, innerWidth]);

        const yScale = d3.scaleLinear()
            .domain([d3.min(data, d => d.visceral) as number, d3.max(data, d => d.visceral) as number])
            .range([innerHeight, 0]);

        // Line generator
        const line = d3.line<VisceralPoint>()
            .x(d => xScale(d.date))
            .y(d => yScale(d.visceral));

        // Append line
        svg.append('path')
            .datum(data)
            .attr('fill', 'none')
            .attr('stroke', lineColor)
            .attr('stroke-width', 1.5)
            .attr('d', line);

        // Append x-axis
        svg.append('g')
            .attr('transform', `translate(0,${innerHeight})`)
            .call(d3.axisBottom(xScale))
            .selectAll('text')
            .attr('transform', 'rotate(-45)')
            .style('text-anchor', 'end');

        // Append y-axis
        svg.append('g')
            .call(d3.axisLeft(yScale));

        // Add tooltip
        svg.selectAll('circle')
            .data(data)
            .enter().append('circle')
            .attr('cx', d => xScale(d.date))
            .attr('cy', d => yScale(d.visceral))
            .attr('r', 5)
            .style('fill', lineColor)
            .on('mouseover', (event, d) => {
                setTooltip({
                    x: xScale(d.date),
                    y: yScale(d.visceral),
                    date: d.date,
                    visceral: d.visceral
                });
            })
            .on('mouseout', () => {
                setTooltip(null);
            });
    }, [data, height, width]);

    return (
        <svg ref={svgRef}>
            {tooltip && (
                <text x={tooltip.x} y={tooltip.y - 10} textAnchor="middle" fill='#fff'>
                    <tspan x={tooltip.x} dy="1.2em">{`Date: ${d3.timeFormat('%d/%m/%Y')(tooltip.date)}`}</tspan>
                    <tspan x={tooltip.x} dy="1.2em">{`Visceral Fat: ${tooltip.visceral}`}</tspan>
                </text>
            )}
        </svg>
    );
}
