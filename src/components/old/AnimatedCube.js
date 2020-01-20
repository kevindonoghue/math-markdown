import { useContext } from "react";
import * as THREE from "three";
import { FigureContext } from './Figure';

function AnimatedCube(props) {
  const figureInfo = useContext(FigureContext)
  let { sideLength, center, color } = props;

  const geometry = new THREE.BoxGeometry(sideLength, sideLength, sideLength);
  const material = new THREE.MeshLambertMaterial({ color: color });
  const cube = new THREE.Mesh(geometry, material);
  cube.position.set(...center);

  function animate(t) {
    cube.rotation.set(0.5*t, 0.33*t, 0.1*t);
  }

  figureInfo.scene.add(cube);
  figureInfo.animationFunctions.push(animate);
  
  return null;
}

AnimatedCube.defaultProps = {
  sideLength: 1,
  center: [0, 0, 0],
  color: "red"
};

export default AnimatedCube;
