import React, { useContext } from "react";
import Axes, { AxesContext } from "./Axes";

function ZeroSet(props) {
  const axes = useContext(AxesContext);
  if (axes.three) {
    return <ZeroSet3d {...props} />;
  } else {
    return <ZeroSet2d {...props} />;
  }
}

function ZeroSet3d(props) {
  const { f, resolution, opacity, color } = props;
  const axes = useContext(AxesContext);

  const samplePoints = { x: [], y: [], z: [] };
  const values = [];
  const delta = axes.bounds.map(x => (x[1] - x[0]) / resolution);

  let x, y, z;
  for (let i = 0; i < resolution; i += 1) {
    for (let j = 0; j < resolution; j += 1) {
      for (let k = 0; k < resolution; k += 1) {
        x = axes.bounds[0][0] + i * delta[0];
        y = axes.bounds[1][0] + j * delta[1];
        z = axes.bounds[2][0] + k * delta[2];
        samplePoints.x.push(x);
        samplePoints.y.push(y);
        samplePoints.z.push(z);
        values.push(f(x, y, z));
      }
    }
  }

  const trace = {
    type: "isosurface",
    x: samplePoints.x,
    y: samplePoints.y,
    z: samplePoints.z,
    value: values,
    isomin: 0,
    isomax: 0,
    caps: {
      x: { show: false },
      y: { show: false },
      z: { show: false }
    },
    opacity: opacity,
    hoverinfo: "skip",
    showscale: false,
    colorscale: [[0.0, color], [1.0, color]],
  };

  axes.data.push(trace);

  return null;
}

ZeroSet3d.defaultProps = {
  resolution: 10,
  opacity: 0.5,
  color: "rgb(140,0,0)",
};

function ZeroSet2d(props) {
  const { f, resolution, opacity, color } = props;
  const axes = useContext(AxesContext);

  const samplePoints = { x: [], y: [] };
  const values = [];
  const delta = axes.bounds.map(x => (x[1] - x[0]) / resolution);

  let x, y;
  for (let i = 0; i < resolution; i += 1) {
    for (let j = 0; j < resolution; j += 1) {
      x = axes.bounds[0][0] + i * delta[0];
      y = axes.bounds[1][0] + j * delta[1];
      samplePoints.x.push(x);
      samplePoints.y.push(y);
      values.push(f(x, y));
    }
  }

  const trace = {
    type: "contour",
    x: samplePoints.x,
    y: samplePoints.y,
    z: values,
    contours: {
      type: 'constraint',
      coloring: 'lines',
    },
    line: {
      color: color,
    },
    opacity: opacity,
  };

  axes.data.push(trace);

  return null;
}

ZeroSet2d.defaultProps = {
  resolution: 25,
  color: 'red',
  opacity: 1,
};

export default ZeroSet;
