import React from "react";
import * as THREE from "three";


// context passed down to Figures
const RenderContext = React.createContext();

// global time for all animations
const startTime = new Date();

/*
Render is a React component that wraps all content that involve 3d rendering.
canvas is a global canvas on which all 3d graphics are rendered. renderer is
the renderer used by all 3d graphics. figures is a list of the figureInfo objects
from each Figure descendant. The figureInfo objects are added to figures in the
body of the Figure function via a RenderContext. figuresInView is a list of the
divs of the Figures that are animated. It is used by observer, an IntersectionObserver
that is used to start and stop rendering when an a Figure enters the view, and also
to loop the rendering while an animated Figre is in the view.

nextFrame is a function that renders the next function. It is passed down to the
Figure level through the renderInfo object and the RenderContext. It is also called
by the callback function of observer. The styling on the div is crucial for the 3d
rendering (see the css in the code snippet at
https://stackoverflow.com/questions/30608723/is-it-possible-to-enable-unbounded-number-of-renderers-in-three-js/30633132#30633132)
*/
function Render(props) {
  const canvas = initializeCanvas();
  const renderer = initializeRenderer(canvas);
  const figures = [];
  const figuresInView = new Set();
  const nextFrame = () => nextFrameFunction(figuresInView, renderer);
  const observer = initializeObserver(nextFrame, figuresInView);
  const renderInfo = { figures, renderer, nextFrame, observer }

  return (
    <div style={{
      position: "absolute",
      top: 0,
      width: "100%",
      zIndex: 1,
    }}>
      <RenderContext.Provider value={renderInfo}>
        {props.children}
      </RenderContext.Provider>
    </div>
  );
}

/* Creates the renderer in Render */
function initializeRenderer(canvas) {
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
  });
  renderer.setPixelRatio(window.devicePixelRatio);

  renderer.updateSize = () => {
    const width = renderer.domElement.clientWidth;
    const height = renderer.domElement.clientHeight;
    if (
      renderer.domElement.width !== width ||
      renderer.domElement.height !== height
    ) {
      renderer.setSize(width, height, false);
    }
  };

  return renderer;
}

/* Creates the canvas in Render */
function initializeCanvas() {
  const canvas = document.createElement("canvas");
  canvas.style.position = "absolute";
  canvas.style.left = "0px";
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.zIndex = -1;
  canvas.id = "main-canvas";
  document.querySelector("body").appendChild(canvas);
  return canvas;
}

/* Creates the observer in Render */
function initializeObserver(renderFunction, figuresInView) {

  // loop the render if there are any animated figures present in the view
  function handleRender() {
    renderFunction();
    if ([...figuresInView].some(x => x.animationFunctions.length > 0)) {
      requestAnimationFrame(handleRender);
    }
  }

  // keep track of which figures are in the current window, and if there are any, render them
  function handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        figuresInView.add(entry.target.figureInfo);
      } else {
        figuresInView.delete(entry.target.figureInfo);
      }
    })
    if (figuresInView.size > 0) {
      handleRender();
    }
  }

  return new IntersectionObserver(handleIntersection);
}

// updates the animations for each Figure and renders the next frame for each Figure (see extremely helpful post by gman here https://stackoverflow.com/questions/30608723/is-it-possible-to-enable-unbounded-number-of-renderers-in-three-js/30633132#30633132)
function nextFrameFunction(figures, renderer) {
  renderer.updateSize();
  renderer.domElement.style.transform = `translateY(${window.scrollY}px)`;

  renderer.setClearColor(0xffffff);
  renderer.setScissorTest(false);
  renderer.clear();

  renderer.setClearColor(0xffffff);
  renderer.setScissorTest(true);

  // need to call ... here because figures might be a Set
  [...figures].forEach(figureInfo => {
    if (!figureInfo.scene || !figureInfo.div) { return };
    const rect = figureInfo.div.getBoundingClientRect();

    if (
      rect.bottom < 0 ||
      rect.top > renderer.domElement.clientHeight ||
      rect.right < 0 ||
      rect.left > renderer.domElement.clientWidth
    ) {
      return; // if the scene is outside the viewing area, don't bother rendering it
    }

    // get location of the plot on the window
    const width = rect.right - rect.left;
    const height = rect.bottom - rect.top;
    const left = rect.left;
    const bottom = renderer.domElement.clientHeight - rect.bottom;

    // render only in that part of the window
    renderer.setViewport(left, bottom, width, height);
    renderer.setScissor(left, bottom, width, height);

    let now = new Date();
    figureInfo.animationFunctions.forEach(f => f((now - startTime)/1000));

    console.log("rendering");
    renderer.render(figureInfo.scene, figureInfo.camera);
  });
}

export default Render;
export { RenderContext };
