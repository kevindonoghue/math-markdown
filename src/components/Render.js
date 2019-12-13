import React from "react";
import * as THREE from "three";

const RenderContext = React.createContext();
const startTime = new Date();

function Render(props) {
  const canvas = initializeCanvas();
  const renderer = initializeRenderer(canvas);
  const figures = [];
  const figuresInView = [];
  const nextFrame = () => nextFrameFunction(renderInfo.figures, renderer);
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

function initializeCanvas() {
  console.log("calling initializeCanvas");
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

function initializeObserver(renderFunction, figuresInView) {

  function handleRender() {
    renderFunction();
    if (figuresInView.length > 0) {
      requestAnimationFrame(handleRender);
    }
  }

  function handleIntersection(entries) {
    figuresInView.length = 0;
    figuresInView.push(...entries.filter(entry => entry.isIntersecting));
    handleRender();
  }

  return new IntersectionObserver(handleIntersection);
}

// renders the plots (see extremely helpful post by gman here https://stackoverflow.com/questions/30608723/is-it-possible-to-enable-unbounded-number-of-renderers-in-three-js/30633132#30633132)
function nextFrameFunction(figures, renderer) {
  renderer.updateSize();
  renderer.domElement.style.transform = `translateY(${window.scrollY}px)`;

  renderer.setClearColor(0xffffff);
  renderer.setScissorTest(false);
  renderer.clear();

  renderer.setClearColor(0xffffff);
  renderer.setScissorTest(true);

  figures.forEach(figureInfo => {
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
