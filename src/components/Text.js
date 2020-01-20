import React, { useContext } from 'react';
import { AxesContext } from './Axes';

function Text(props) {
  const { text, location, textposition } = props;
  const axes = useContext(AxesContext);

  let trace;
  if (axes.dim === 3) {
    trace = {
      type: 'scatter3d',
      mode: 'text',
      text: text,
      textposition: textposition,
      x: [location[0]],
      y: [location[1]],
      z: [location[2]],
      hoverinfo: 'none'
    }
  } else {
    trace = {
      type: 'scatter',
      mode: 'text',
      text: text,
      textposition: textposition,
      x: [location[0]],
      y: [location[1]],
      hoverinfo: 'none'
    }
  }

  axes.data.push(trace);
  return null;
}

Text.defaultProps = {
  textposition: 'center',
}

export default Text;