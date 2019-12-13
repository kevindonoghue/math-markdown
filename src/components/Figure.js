import React, { useContext, useRef, useEffect } from "react";
import * as THREE from "three";
const OrbitControls = require("three-orbit-controls")(THREE);
import { RenderContext } from "./Render";

const FigureContext = React.createContext();

function Figure(props) {
  const ref = useRef(null);
  const figureInfo = {
    ...initializeScene(props.width, props.height),
    animationFunctions: [],
    scale: 1
  };
  const renderInfo = useContext(RenderContext);
  renderInfo.figures.push(figureInfo);

  useEffect(() => {
    ref.current.style.width = `${props.width}px`;
    ref.current.style.height = `${props.height}px`;

    let controls = new OrbitControls(figureInfo.camera, ref.current);

    controls.addEventListener("change", renderInfo.nextFrame);
    window.addEventListener("resize", renderInfo.nextFrame);
    window.addEventListener("scroll", renderInfo.nextFrame);

    figureInfo.controls = controls;
    figureInfo.div = ref.current;
    if (figureInfo.animationFunctions.length > 0) {
      renderInfo.observer.observe(figureInfo.div);
    }
    
    renderInfo.nextFrame();
  }, [ref, figureInfo, renderInfo]);

  return (
    <div ref={ref}>
      <FigureContext.Provider value={figureInfo}>
        {props.children}
      </FigureContext.Provider>
    </div>
  );
}

Figure.defaultProps = {
  width: 400,
  height: 400
};

function initializeScene(width, height) {
  const cameraPosition = [0, 0, 5];
  const fov = 60;
  const camera = new THREE.PerspectiveCamera(fov, width / height, 0.01, 1000);
  camera.position.set(...cameraPosition);

  const light = new THREE.DirectionalLight();
  light.position.set(3, 4, 5);
  const scene = new THREE.Scene();
  scene.add(light);

  return { scene, camera };
}

export default Figure;
export { FigureContext };
