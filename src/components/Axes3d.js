import { useContext } from "react";
import * as THREE from "three";
import { FigureContext } from "./Figure";

/*
Creates 3d axes with upper and lower x, y, z bounds specified by the
triple of pairs prop.bounds.
*/
function Axes3d(props) {
  const figureInfo = useContext(FigureContext);
  let { bounds, tickSpacing, scale } = props;
  scale = scale ? scale : Math.max(...bounds.map(x => Math.max(...x)));

  const axes = initializeAxes(bounds, scale);
  const arrows = initializeArrows(bounds, scale);
  let ticks = [];
  if (tickSpacing) {
    ticks = initializeTicks(bounds, scale, tickSpacing);
  }

  const meshes = [...axes, ...arrows, ...ticks];
  meshes.forEach(mesh => figureInfo.scene.add(mesh));
  figureInfo.scale = scale;

  return null;
}

Axes3d.defaultProps = {
  bounds: [
    [-1, 1],
    [-1, 1],
    [-1, 1]
  ],
  tickSpacing: null, // e.g., [1, 1, 1] to space ticks by 1 on each axis
  labelTicks: null,
  scale: null // override the default scale in function body
};

/* Creates the lines of the axes */
function initializeAxes(bounds, scale) {
  const axisRadius = scale * 0.005;

  const xAxisGeometry = new THREE.CylinderBufferGeometry(
    axisRadius,
    axisRadius,
    bounds[0][1] - bounds[0][0],
    8
  );
  const yAxisGeometry = new THREE.CylinderBufferGeometry(
    axisRadius,
    axisRadius,
    bounds[1][1] - bounds[1][0],
    8
  );
  const zAxisGeometry = new THREE.CylinderBufferGeometry(
    axisRadius,
    axisRadius,
    bounds[2][1] - bounds[2][0],
    8
  );
  const material = new THREE.MeshBasicMaterial({ color: "black" });

  const xAxisMesh = new THREE.Mesh(xAxisGeometry, material);
  const yAxisMesh = new THREE.Mesh(yAxisGeometry, material);
  const zAxisMesh = new THREE.Mesh(zAxisGeometry, material);

  xAxisMesh.rotateZ(Math.PI / 2);
  zAxisMesh.rotateX(Math.PI / 2);

  return [xAxisMesh, yAxisMesh, zAxisMesh];
}

/* Creates the arrows of the axes */
function initializeArrows(bounds, scale) {
  const arrowRadius = scale * 0.025;
  const arrowHeight = scale * 0.075;
  const arrowGeometry = new THREE.ConeBufferGeometry(
    arrowRadius,
    arrowHeight,
    8
  );
  const material = new THREE.MeshBasicMaterial({ color: "black" });

  const arrows = [
    new THREE.Mesh(arrowGeometry, material),
    new THREE.Mesh(arrowGeometry, material),
    new THREE.Mesh(arrowGeometry, material)
  ];

  arrows[0].position.set(bounds[0][1], 0, 0);
  arrows[1].position.set(0, bounds[1][1], 0);
  arrows[2].position.set(0, 0, bounds[2][1]);

  arrows[0].rotateZ(-Math.PI / 2);
  arrows[2].rotateX(Math.PI / 2);

  return arrows;
}

/* Creates the ticks of the axes */
function initializeTicks(bounds, scale, tickSpacing) {
  const tickThickness = scale * 0.0001;
  const tickRadius = scale * 0.025;
  const tickGeometry = new THREE.CylinderBufferGeometry(
    tickRadius,
    tickRadius,
    tickThickness,
    8
  );
  const material = new THREE.MeshBasicMaterial({ color: "black" });

  const ticks = [];

  for (let i = 0; i < 3; i += 1) {
    let j;

    j = 1;
    while (-j * tickSpacing[i] > bounds[i][0]) {
      let tick = new THREE.Mesh(tickGeometry, material);
      if (i == 0) {
        tick.position.set(-j * tickSpacing, 0, 0);
        tick.rotateZ(Math.PI / 2);
      }
      if (i == 1) {
        tick.position.set(0, -j * tickSpacing, 0);
      }
      if (i == 2) {
        tick.position.set(0, 0, -j * tickSpacing);
        tick.rotateX(Math.PI / 2);
      }
      j += 1;
      ticks.push(tick);
    }

    j = 1;
    while (j * tickSpacing[i] < bounds[i][1]) {
      let tick = new THREE.Mesh(tickGeometry, material);
      if (i == 0) {
        tick.position.set(j * tickSpacing, 0, 0);
        tick.rotateZ(Math.PI / 2);
      }
      if (i == 1) {
        tick.position.set(0, j * tickSpacing, 0);
      }
      if (i == 2) {
        tick.position.set(0, 0, j * tickSpacing);
        tick.rotateX(Math.PI / 2);
      }
      j += 1;
      ticks.push(tick);
    }
  }

  return ticks;
}

export default Axes3d;
