import { useContext } from "react";
import * as THREE from "three";
import { FigureContext } from "./Figure";

function Axes2d(props) {
  const figureInfo = useContext(FigureContext);
  let { bounds, tickSpacing, scale } = props;
  scale = scale ? scale : Math.max(...bounds.map(x => Math.max(...x)));

  const axes = initializeAxes(bounds, scale);
  const arrows = initializeArrows(bounds, scale);
  let ticks = []
  if (tickSpacing) {
    ticks = initializeTicks(bounds, scale, tickSpacing);
  }

  const meshes = [...axes, ...arrows, ...ticks];
  meshes.forEach(mesh => figureInfo.scene.add(mesh));
  figureInfo.scale = scale;

  return null;
}

Axes2d.defaultProps = {
  bounds: [
    [-1, 1],
    [-1, 1],
  ],
  tickSpacing: null, // e.g., [1, 1] to space ticks by 1 on each axis
  labelTicks: null,
  scale: null // override the default scale in function body
};

function initializeAxes(bounds, scale) {
  const material = new THREE.LineBasicMaterial({ color: 'black' });

  const xAxisGeometry = new THREE.Geometry();
  xAxisGeometry.vertices.push(new THREE.Vector3(scale*bounds[0][0], 0, 0));
  xAxisGeometry.vertices.push(new THREE.Vector3(scale*bounds[0][1], 0, 0));
  const xAxis = new THREE.Line(xAxisGeometry, material);

  const yAxisGeometry = new THREE.Geometry();
  yAxisGeometry.vertices.push(new THREE.Vector3(0, scale*bounds[1][0], 0));
  yAxisGeometry.vertices.push(new THREE.Vector3(0, scale*bounds[1][1], 0));
  const yAxis = new THREE.Line(yAxisGeometry, material);
  
  return [xAxis, yAxis];
};

function initializeArrows(bounds, scale) {
  const arrowRadius = scale * 0.025;
  const arrowHeight = scale * 0.075;

  const material = new THREE.MeshBasicMaterial({ color: 'black' });

  const xArrowGeometry = new THREE.Geometry();
  xArrowGeometry.vertices.push(new THREE.Vector3(scale*bounds[0][1], 0, 0));
  xArrowGeometry.vertices.push(new THREE.Vector3(scale*bounds[0][1]-arrowHeight, arrowRadius, 0));
  xArrowGeometry.vertices.push(new THREE.Vector3(scale*bounds[0][1]-arrowHeight, -arrowRadius, 0));
  xArrowGeometry.faces.push(new THREE.Face3(0, 1, 2));
  const xArrow = new THREE.Mesh(xArrowGeometry, material);

  const yArrowGeometry = new THREE.Geometry();
  yArrowGeometry.vertices.push(new THREE.Vector3(0, scale*bounds[1][1], 0));
  yArrowGeometry.vertices.push(new THREE.Vector3(-arrowRadius, scale*bounds[1][1]-arrowHeight, 0));
  yArrowGeometry.vertices.push(new THREE.Vector3(arrowRadius, scale*bounds[1][1]-arrowHeight, 0));
  yArrowGeometry.faces.push(new THREE.Face3(0, 1, 2));
  const yArrow = new THREE.Mesh(yArrowGeometry, material);

  return [xArrow, yArrow]

};

function initializeTicks(bounds, scale, tickSpacing) {
  const tickRadius = scale*0.025;
  const material = new THREE.LineBasicMaterial({ color: "black" });

  const ticks = [];

  for (let i = 0; i < 2; i += 1) {
    let j;

    j = 1;
    while (-j * tickSpacing[i] > bounds[i][0]) {
      let tickGeometry = new THREE.Geometry()
      if (i == 0) {
        tickGeometry.vertices.push(new THREE.Vector3(-j * tickSpacing[i], tickRadius, 0));
        tickGeometry.vertices.push(new THREE.Vector3(-j * tickSpacing[i], -tickRadius, 0));
      }
      if (i == 1) {
        tickGeometry.vertices.push(new THREE.Vector3(tickRadius, -j * tickSpacing[i], 0));
        tickGeometry.vertices.push(new THREE.Vector3(-tickRadius, -j * tickSpacing[i], 0));
      }
      let tick = new THREE.Line(tickGeometry, material);
      j += 1;
      ticks.push(tick);
    }

    j = 1;
    while (j * tickSpacing[i] < bounds[i][1]) {
      let tickGeometry = new THREE.Geometry()
      if (i == 0) {
        tickGeometry.vertices.push(new THREE.Vector3(j * tickSpacing[i], tickRadius, 0));
        tickGeometry.vertices.push(new THREE.Vector3(j * tickSpacing[i], -tickRadius, 0));
      }
      if (i == 1) {
        tickGeometry.vertices.push(new THREE.Vector3(tickRadius, j * tickSpacing[i], 0));
        tickGeometry.vertices.push(new THREE.Vector3(-tickRadius, j * tickSpacing[i], 0));
      }
      let tick = new THREE.Line(tickGeometry, material);
      j += 1;
      ticks.push(tick);
    }
  }

  return ticks;
}

export default Axes2d;