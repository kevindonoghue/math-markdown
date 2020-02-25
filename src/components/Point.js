import React, { useContext } from 'react';
import { AxesContext } from './Axes';

function Point(props) {
  let { location, color, textposition, label, noLabel } = props;
  const axes = useContext(AxesContext);

  if (!label && !noLabel && axes.three) {
    label = `(${location[0]}, ${location[1]}, ${location[2]})`;
  }

  if (!label && !noLabel && !axes.three) {
    label = `(${location[0]}, ${location[1]})`;
  }

  let trace;
  if (axes.three) {
    trace = {
      type: 'scatter3d',
      mode: 'markers+text',
      text: label,
      textposition: textposition,
      x: [location[0]],
      y: [location[1]],
      z: [location[2]],
      marker: {
        color: color,
        size: 2,
      }
    }
  } else {
    trace = {
      type: 'scatter',
      mode: 'markers+text',
      text: label,
      textposition: textposition,
      x: [location[0]],
      y: [location[1]],
      marker: {
        color: color,
      }
    }
  }

  axes.data.push(trace);
  return null;
}

Point.defaultProps = {
  textposition: 'top center',
  color: 'red',
  label: null,
  noLabel: false,
}

export default Point;