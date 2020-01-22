import React, { useContext } from 'react';
import { AxesContext } from './Axes';

function LineSegment(props) {
  const { start, end, color} = props
  const axes = useContext(AxesContext);

  let trace;
  if (axes.dim === 3) {
    trace = {
      type: 'scatter3d',
      mode: 'lines',
      x: [start[0], end[0]],
      y: [start[1], end[1]],
      z: [start[2], end[2]],
      line: {
        width: 2,
        color: color,
      },
    }
  } else {
    trace = {
      type: 'scatter',
      mode: 'lines',
      x: [start[0], end[0]],
      y: [start[1], end[1]],
      line: {
        width: 2,
        color: color,
      },
    }
  }
  
  axes.data.push(trace);
  return null;
}

LineSegment.defaultProps = {
  color: 'red',
}

export default LineSegment;