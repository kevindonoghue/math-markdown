import React, { useContext } from 'react';
import { AxesContext } from './Axes';

function TestObject(props) {
  const axes = useContext(AxesContext);
  const trace = {
    type: 'scatter3d',
    mode: 'lines',
    x: [-1, 0],
    y: [0, 0.5],
    z: [1, 1],
    line: {
      width: 2,
      color: 'red',
    },
    hoverinfo: 'none',
  }
  axes.data.push(trace);
  return null;
}

export default TestObject;