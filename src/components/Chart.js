import React from "react";
// Chart Imports
import { AreaClosed, Line, Bar} from "@vx/shape";
import { curveMonotoneX } from "@vx/curve";
import { GridRows, GridColumns } from "@vx/grid";
import { scaleTime, scaleLinear } from "@vx/scale";
import { useTooltip, Tooltip } from "@vx/tooltip";
import { localPoint } from "@vx/event";
import { bisector } from "d3-array";
import { timeFormat } from "d3-time-format";

const Chart = ({ stock, width, height }) => {
  //const stock = appleStock.slice(800);
  // util

  const formatDate = timeFormat("%b %d, '%y");
  const min = (arr, fn) => Math.min(...arr.map(fn));
  const max = (arr, fn) => Math.max(...arr.map(fn));
  const extent = (arr, fn) => [min(arr, fn), max(arr, fn)];

  // Setting width/height & graph margins before render enables responsiveness
  //const width = 750;
  //const height = 400;

  const margin = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };
  // Data "Accessors"(D3) for Area Graph
  const xAxis = (data) => new Date(data.date);
  const yAxis = (data) => data.close;
  const bisectDate = bisector((data) => new Date(data.date)).left;

  // value boundaries
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  // scaling // D3 calculates scaling necessary to display chart at chosen value boundaries
  const xScale = scaleTime({
    range: [0, xMax],
    domain: extent(stock, xAxis),
  });
  const yScale = scaleLinear({
    range: [yMax, 0],
    domain: [0, max(stock, yAxis) + yMax / 3],
    nice: true,
  });

  //the useTooltip() hook  returns object to manage the tooltip state.
  const {
    tooltipData,
    tooltipLeft,
    tooltipTop,
    tooltipOpen,
    showTooltip,
    hideTooltip,
  } = useTooltip();

  const handleToolTip = ({ event, data, xAxis, xScale, yScale }) => {
    const { x } = localPoint(event);
    const x0 = xScale.invert(x);
    const index = bisectDate(data, x0, 1);
    const d0 = data[index - 1];
    const d1 = data[index];
    let d = d0;
    if (d1 && d1.date) {
      d = x0 - xAxis(d0.date) > xAxis(d1.date) - x0 ? d1 : d0;
    }
    showTooltip({
      tooltipData: d,
      tooltipLeft: x,
      tooltipTop: yScale(d.close),
    });
  };

  return (
    <div>
      <svg width={width} height={height}>
        <rect x={0} y={0} width={width} height={height} fill="#425A70" rx={5} />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="120%">
            <stop offset="0%" stopColor="#17DEA2" stopOpacity={2} />
            <stop offset="100%" stopColor="#17DEA2" stopOpacity={-5} />
          </linearGradient>
        </defs>
        <GridRows
          lineStyle={{ pointerEvents: "none" }}
          scale={yScale}
          width={xMax}
          strokeDasharray="2,2"
          stroke="rgba(255,255,255,0.06)"
        />
        <GridColumns
          lineStyle={{ pointerEvents: "none" }}
          scale={xScale}
          height={yMax}
          strokeDasharray="2,2"
          stroke="rgba(255,255,255,0)"
        />
        <AreaClosed
          data={stock}
          x={(d) => xScale(xAxis(d))}
          y={(d) => yScale(yAxis(d))}
          yScale={yScale}
          strokeWidth={1}
          stroke={"url(#gradient)"}
          fill={"url(#gradient)"}
          curve={curveMonotoneX}
        />
        <Bar
          x={0}
          y={0}
          width={width}
          height={height}
          fill="transparent"
          rx={5}
          data={stock}
          onTouchStart={(event) =>
            handleToolTip({ event, xAxis, xScale, yScale, data: stock })
          }
          onTouchMove={(event) =>
            handleToolTip({
              event,
              xAxis,
              xScale,
              yScale,
              data: stock,
            })
          }
          onMouseMove={(event) =>
            handleToolTip({
              event,
              xAxis,
              xScale,
              yScale,
              data: stock,
            })
          }
          onMouseLeave={(event) => hideTooltip()}
        />
        {tooltipData && (
          <g>
            <Line
              from={{ x: tooltipLeft, y: 0 }}
              to={{ x: tooltipLeft, y: yMax }}
              stroke="#17DEA2"
              strokeWidth={2}
              style={{ pointerEvents: "none" }}
              strokeDasharray="2,2"
            />
            <circle
              cx={tooltipLeft}
              cy={tooltipTop + 1}
              r={4}
              fill="black"
              fillOpacity={0.1}
              stroke="black"
              strokeOpacity={0.1}
              strokeWidth={2}
              style={{ pointerEvents: "none" }}
            />
            <circle
              cx={tooltipLeft}
              cy={tooltipTop}
              r={4}
              fill="rgba(92, 119, 235, 1.000)"
              stroke="white"
              strokeWidth={2}
              style={{ pointerEvents: "none" }}
            />
          </g>
        )}
      </svg>
      {tooltipData && (
        <div>
          <div style={{ position: "relative" }}>
            <Tooltip
              top={tooltipTop - 160}
              left={tooltipLeft - 30}
              style={{
                backgroundColor: "rgba(92, 119, 235, 1.000)",
                color: "white",
              }}
            >
              {`$${yAxis(tooltipData)}`}
            </Tooltip>
          </div>
          <div style={{ position: "relative" }}>
            <Tooltip
              top={yMax - 110}
              left={tooltipLeft}
              style={{
                transform: "translateX(-50%)",
              }}
            >
              {formatDate(xAxis(tooltipData))}
            </Tooltip>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chart;
