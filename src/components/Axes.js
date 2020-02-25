import React from "react";
import Plot from "./Plot";

function Axes(props) {
  let { three, bounds, layout, config, style } = props;

  if (!bounds && !three) {
    bounds = [
      [-1, 1],
      [-1, 1]
    ];
  } else if (!bounds && three) {
    bounds = [
      [-1, 1],
      [-1, 1],
      [-1, 1]
    ];
  } else if (!isNaN(bounds) && !three) {
    bounds = [
      [-bounds, bounds],
      [-bounds, bounds],
    ]
  } else if (!isNaN(bounds) && three) {
    bounds = [
      [-bounds, bounds],
      [-bounds, bounds],
      [-bounds, bounds]
    ]
  }

  if (!layout && !three) {
    layout = getDefault2dLayout(bounds);
  }
  if (!layout && three) {
    layout = getDefault3dLayout(bounds);
  }

  if (!config && !three) {
    config = { displayModeBar: false, staticPlot: true };
  }
  if (!config && three) {
    config = { displayModeBar: false };
  }

  const axes = {
    three: three,
    data: [],
    layout: layout,
    config: config,
    bounds: bounds,
    style: style,
  };

  if (three) {
    get3dAxes(bounds).forEach(x => axes.data.push(x));
  }

  return (
    <AxesContext.Provider value={axes}>
      {props.children}
      <Plot
        three={three}
        data={axes.data}
        layout={axes.layout}
        config={axes.config}
        style={axes.style}
      />
    </AxesContext.Provider>
  );
}

Axes.defaultProps = {
  three: false,
  bounds: null,
  layout: null,
  config: null,
  style: {margin: '0 auto'},
};

const AxesContext = React.createContext();

function getDefault2dLayout(bounds) {
  return {
    hovermode: false,
    xaxis: {
      range: bounds[0],
      // fixedrange: true,
      constrain: "domain"
    },
    yaxis: {
      range: bounds[1],
      // fixedrange: true,
      scaleanchor: "x"
    },
    showlegend: false,
    shapes: [] // need to include this for svg paths, for example the arrowhead on a 2d vector
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
    hovermode: false,
    scene: {
      aspectratio: {
        x: 1,
        y: 1,
        z: 1
      },
      hovertemplate: null,
      xaxis: {
        ...emptyAxisSettings,
        range: [
          -Math.max(...bounds[0].map(x => Math.abs(x))),
          Math.max(...bounds[0].map(x => Math.abs(x)))
        ]
      },
      yaxis: {
        ...emptyAxisSettings,
        range: [
          -Math.max(...bounds[1].map(x => Math.abs(x))),
          Math.max(...bounds[1].map(x => Math.abs(x)))
        ]
      },
      zaxis: {
        ...emptyAxisSettings,
        range: [
          -Math.max(...bounds[2].map(x => Math.abs(x))),
          Math.max(...bounds[2].map(x => Math.abs(x)))
        ]
      }
    },
    showlegend: false
  };
}

function get3dAxes(bounds) {
  const xAxis = {
    type: "scatter3d",
    mode: "lines",
    x: bounds[0],
    y: [0, 0],
    z: [0, 0],
    line: {
      width: 3,
      color: "black"
    }
  };

  const yAxis = {
    type: "scatter3d",
    mode: "lines",
    x: [0, 0],
    y: bounds[1],
    z: [0, 0],
    line: {
      width: 3,
      color: "black"
    }
  };

  const zAxis = {
    type: "scatter3d",
    mode: "lines",
    x: [0, 0],
    y: [0, 0],
    z: bounds[2],
    line: {
      width: 3,
      color: "black"
    }
  };

  const xLabel = {
    type: "scatter3d",
    mode: "text",
    text: "x",
    x: [bounds[0][1]],
    y: [0],
    z: [0]
  };

  const yLabel = {
    type: "scatter3d",
    mode: "text",
    text: "y",
    x: [0],
    y: [bounds[1][1]],
    z: [0]
  };

  const zLabel = {
    type: "scatter3d",
    mode: "text",
    text: "z",
    x: [0],
    y: [0],
    z: [bounds[2][1]]
  };

  return [xAxis, yAxis, zAxis, xLabel, yLabel, zLabel];
}

export default Axes;
export { AxesContext };
