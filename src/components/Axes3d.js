import { useContext } from 'react';
import * as THREE from "three";
import { FigureContext } from './Figure';

function Axes3d(props) {
  const figureInfo = useContext(FigureContext);
  console.log(props);
  let { axisBounds, tickSpacing, scale } = props;
  scale = (scale) ? scale : Math.max(...axisBounds.map(x => Math.max(...x)));

  const axes = initializeAxes(axisBounds);

  const meshes = [...axes];
  meshes.forEach(mesh => figureInfo.scene.add(mesh));

  return null;
}

Axes3d.defaultProps = {
  axisBounds: [[-1, 1], [-1, 1], [-1, 1]],
  tickSpacing: null, // e.g., [1, 1, 1] to space ticks by 1 on each axis
  scale: null, // override the default scale in function body
};

function initializeAxes(axisBounds) {
  const xAxisGeometry = new THREE.CylinderBufferGeometry(0.075, 0.075, axisBounds[0][1] - axisBounds[0][0]);
  const yAxisGeometry = new THREE.CylinderBufferGeometry(0.075, 0.075, axisBounds[1][1] - axisBounds[1][0]);
  const zAxisGeometry = new THREE.CylinderBufferGeometry(0.075, 0.075, axisBounds[2][1] - axisBounds[2][0]);
  const material = new THREE.MeshBasicMaterial({color: 'black'});
  
  const xAxisMesh = new THREE.Mesh(xAxisGeometry, material);
  const yAxisMesh = new THREE.Mesh(yAxisGeometry, material);
  const zAxisMesh = new THREE.Mesh(zAxisGeometry, material);

  xAxisMesh.rotateZ(Math.PI/2);
  zAxisMesh.rotateX(Math.PI/2);

  return [xAxisMesh, yAxisMesh, zAxisMesh]
}


export default Axes3d;