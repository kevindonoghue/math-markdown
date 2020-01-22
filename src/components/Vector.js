import React, { useContext } from 'react';
import { AxesContext } from './Axes';


function Vector(props) {
  const axes = useContext(AxesContext);
  if (axes.dim === 3) {
    return <Vector3d {...props} />
  } else {
    return <Vector2d {...props} />
  }
}


function Vector3d(props) {
  const { disp, start, color } = props;
  const axes = useContext(AxesContext);

  const scale = Math.max(...axes.bounds.map(x => Math.max(...x.map(y => Math.abs(y)))));


  const line = {
    type: 'scatter3d',
      mode: 'lines',
      x: [start[0], start[0] + disp[0]],
      y: [start[1], start[1] + disp[1]],
      z: [start[2], start[2] + disp[2]],
      line: {
        width: 3,
        color: color,
      },
  }

  const arrowhead = {
    type: 'cone',
    x: [disp[0] + start[0]],
    y: [disp[1] + start[1]],
    z: [disp[2] + start[2]],
    u: [disp[0]],
    v: [disp[1]],
    w: [disp[2]],
    sizeref: 0.25*scale,
    anchor: 'tip',
    showscale: false,
    colorscale: [[0.0, color], [1.0, color]],
  }

  console.log(arrowhead);

  axes.data.push(arrowhead, line);
  
  return null;
}

Vector3d.defaultProps = {
  start: [0, 0, 0],
  color: "red",
}

function Vector2d(props) {
  const { disp, start, color } = props;
  const axes = useContext(AxesContext);

  const scale = Math.max(...axes.bounds.map(x => Math.max(...x.map(y => Math.abs(y)))));

  const path = create2dArrowheadSVGPath(start, disp, scale);

  console.log(path);

  const arrowhead = {
    type: 'path',
    path: path,
    fillcolor: color,
    line: {
      color: color,
    }
  };

  const line = {
    type: 'scatter',
      mode: 'lines',
      x: [start[0], start[0] + disp[0]],
      y: [start[1], start[1] + disp[1]],
      line: {
        width: 3,
        color: color,
      },
  };

  axes.data.push(line);
  axes.layout.shapes.push(arrowhead);

  return null;
}

Vector2d.defaultProps = {
  start: [0, 0],
  color: 'red',
}

function create2dArrowheadSVGPath(start, disp, scale) {
  let theta = Math.atan(disp[1]/disp[0]);
  if (disp[0] < 0) {
    theta += Math.PI
  }

  function rotate(x) {
    return [
      x[0]*Math.cos(theta) - x[1]*Math.sin(theta),
      x[0]*Math.sin(theta) + x[1]*Math.cos(theta)
    ]
  }

  let corners = [[0, 0], [-2, 1], [-2, -1]];
  corners = corners.map(x => x.map(y => y*0.025*scale));
  corners = corners.map(x => rotate(x));
  corners = corners.map(x => [x[0] + start[0] + disp[0], x[1] + start[1] + disp[1]]);

  const path = `M ${corners[0][0]},${corners[0][1]} L ${corners[1][0]},${corners[1][1]} L ${corners[2][0]},${corners[2][1]} Z`

  return path
  
}

export default Vector;