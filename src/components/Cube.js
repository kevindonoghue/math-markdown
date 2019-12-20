import { useContext } from "react";
import * as THREE from "three";
import { FigureContext } from './Figure';

function Cube(props) {
  const figureInfo = useContext(FigureContext)
  let { sideLength, center, color } = props;

  const geometry = new THREE.BoxBufferGeometry(sideLength, sideLength, sideLength);
  const material = new THREE.MeshLambertMaterial({ color: color });
  const cube = new THREE.Mesh(geometry, material);
  cube.position.set(...center);

  figureInfo.scene.add(cube);

  return null;
}

Cube.defaultProps = {
  sideLength: 1,
  center: [0, 0, 0],
  color: "red"
};

export default Cube;
