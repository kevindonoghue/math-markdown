import React from "react";
import { Plot as Plot2d } from "react-plotly.js";
import Plot3d from "./Plot3d";

// distinct from the Plot component from react-plotly.js
function Plot(props) {
  let { dim, bounds, layout, config } = props;

  if (!bounds && dim !== 3) {
    bounds = [[-1, 1], [-1, 1]]
  }
  if (!bounds && dim === 3) {
    bounds = [[-1, 1], [-1, 1], [-1, 1]]
  }

  if (!layout && dim !== 3) {
    layout = getDefault2dLayout(bounds);
  }
  if (!layout && dim === 3) {
    layout = getDefault3dLayout(bounds);
  }

  if (!config && dim !== 3) {
    config = { displayModeBar: false };
  }
  if (!config && dim === 3) {
    config = { displayModeBar: false };
  }

  const plot = { data: [], layout: layout, config: config };
  const plotComponent =
    dim === 3 ? (
      <Plot3d data={plot.data} layout={plot.layout} config={plot.config} />
    ) : (
      <Plot2d data={plot.data} layout={plot.layout} />
    );

  if (dim === 3) {
    get3dAxes(bounds).forEach(x => plot.data.push(x));
  }

  return (
    <PlotContext.Provider value={plot}>
      {props.children}
      {plotComponent}
    </PlotContext.Provider>
  );
}

const PlotContext = React.createContext();

Plot.defaultProps = {
  dim: 2,
  bounds: null,
  layout: null,
  config: null
};

function getDefault2dLayout(bounds) {
  return {
    xaxis: {
      range: bounds[0]
    },
    yaxis: {
      range: bounds[1]
    },
    showlegend: false
  };
}

function getDefault3dLayout(bounds) {
  const emptyAxisSettings = {
    showgrid: false,
    showline: false,
    zeroline: false,
    ticks: "",
    showticklabels: false,
    title: "",
    showspikes: false
  };

  return {
    scene: {
      xaxis: {
        ...emptyAxisSettings,
        range: [
          -Math.max(...(bounds[0].map(x => Math.abs(x)))),
          Math.max(...(bounds[0].map(x => Math.abs(x))))
        ]
      },
      yaxis: {
        ...emptyAxisSettings,
        range: [
          -Math.max(...(bounds[1].map(x => Math.abs(x)))),
          Math.max(...(bounds[1].map(x => Math.abs(x))))
        ]
      },
      zaxis: {
        ...emptyAxisSettings,
        range: [
          -Math.max(...(bounds[2].map(x => Math.abs(x)))),
          Math.max(...(bounds[2].map(x => Math.abs(x))))
        ]
      }
    },
    showlegend: false
  };
}

function get3dAxes(bounds) {
  const xAxis = {
    type: 'scatter3d',
    mode: 'lines',
    x: bounds[0],
    y: [0, 0],
    z: [0, 0],
    line: {
      width: 3,
      color: 'black',
    },
    hoverinfo: 'none',
  }

  const yAxis = {
    type: 'scatter3d',
    mode: 'lines',
    x: [0, 0],
    y: bounds[1],
    z: [0, 0],
    line: {
      width: 3,
      color: 'black',
    },
    hoverinfo: 'none'
  }

  const zAxis = {
    type: 'scatter3d',
    mode: 'lines',
    x: [0, 0],
    y: [0, 0],
    z: bounds[2],
    line: {
      width: 3,
      color: 'black',
    },
    hoverinfo: 'none'
  }

  const xLabel = {
    type: 'scatter3d',
    mode: 'text',
    text: 'x',
    x: [bounds[0][1]],
    y: [0],
    z: [0],
    hoverinfo: 'none'
  }

  const yLabel = {
    type: 'scatter3d',
    mode: 'text',
    text: 'y',
    x: [0],
    y: [bounds[1][1]],
    z: [0],
    hoverinfo: 'none'
  }

  const zLabel = {
    type: 'scatter3d',
    mode: 'text',
    text: 'z',
    x: [0],
    y: [0],
    z: [bounds[2][1]],
    hoverinfo: 'none'
  }

  return [xAxis, yAxis, zAxis, xLabel, yLabel, zLabel];
}

export default Plot;
export { PlotContext };
