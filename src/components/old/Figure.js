import React, { useContext, useRef, useEffect } from "react";
import * as THREE from "three";
const OrbitControls = require("three-orbit-controls")(THREE);
import { RenderContext } from "./Render";

// context passed down to Plots
const FigureContext = React.createContext();

/*
Figure creates a THREE.js scene, camera, controls, and div centered in the page.
The children of Figure are to be used to add objects to this scene (for example,
axes or graphs of functions). The children can do so via the figureInfo object,
which is passed to descendants via the FigureContext. The controls reference
the div which this function creates (referenced via ref) and so they need to be
created in an effect which is triggered when ref changes. The animate function,
passed down from Render through the RenderContext, is attached to an event listener
for interacting with the scene via the controls.

figureInfo contains two other attributes: animationFunctions and scale.
animationFunctions contains the functions passed to nextFrameFunction to progress
the animation of the animated objects. The Figure has animated children if and only
if animationFunctions.length > 0 and so if this is the case, the div for the Figure 
is targeted by the observer passed down from Render.

The div can be styled via props.style.

Let props.dim be 2 or 3, depending on whether the figure is 2 or 3-dimensional. This
will change the camera and controls.
*/
function Figure(props) {
  const { dim, width, height } = props;
  const ref = useRef(null);
  const figureInfo = {
    ...initializeScene(dim, width, height),
    animationFunctions: [],
    scale: 1,
    overlays: [],
    width: width,
    height: height,
  };
  const renderInfo = useContext(RenderContext);

  renderInfo.figures.push(figureInfo);

  useEffect(() => {
    ref.current.style.width = `${width}px`;
    ref.current.style.height = `${height}px`;
    
    if (dim === 3) {
      let controls = new OrbitControls(figureInfo.camera, ref.current);
      figureInfo.controls = controls;
      controls.addEventListener("change", () => renderInfo.animate(renderInfo, true));
    }

    figureInfo.div = ref.current;
    figureInfo.div.figureInfo = figureInfo; // for the purposes of determining figureInView in Render, need to allow the div to reference the figureInfo object
    renderInfo.observer.observe(figureInfo.div);

  }, [ref, figureInfo, renderInfo]);

  useEffect(() => {
    figureInfo.camera.position.multiplyScalar(figureInfo.scale);
  }, [figureInfo.scale]);

  return (
    <div ref={ref} style={{
      ...props.style,
      margin: "0 auto"
    }}>
      <FigureContext.Provider value={figureInfo}>
        {props.children}
      </FigureContext.Provider>
    </div>
  );
}

Figure.defaultProps = {
  dim: 2,
  width: 400,
  height: 400
};

/* Creates the scene and camera in Figure */
function initializeScene(dim, width, height) {
  const cameraPosition = (dim === 3) ? [1.2, 1.3, 1.4] : [0, 0, 2];
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
