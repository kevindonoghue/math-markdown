import React from "react";
import * as THREE from "three";
import Stats from "stats.js";

const stats = new Stats();
stats.showPanel(0);
document.body.appendChild(stats.dom);

const contentWidth = 800;
document.body.style.minWidth = `${contentWidth/2}px`;

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
  const activeAnimationFrames = new Set();
  const renderInfo = {
    figures,
    renderer,
    figuresInView,
    activeAnimationFrames
  };
  const observer = initializeObserver(renderInfo);
  renderInfo.observer = observer;
  renderInfo.animate = animate;

  window.addEventListener("resize", () => {
    renderer.setSize(Math.min(window.innerWidth, contentWidth), window.innerHeight);
    animate(renderInfo, true);
  });

  return (
    <div
      style={{
        margin: "0 auto"
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          marginLeft: -contentWidth / 2,
          width: contentWidth,
          zIndex: 1
        }}
      >
        <RenderContext.Provider value={renderInfo}>
          {props.children}
        </RenderContext.Provider>
      </div>
    </div>
  );
}

/* Creates the renderer in Render */
function initializeRenderer(canvas) {
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true, // set to false for better performance
    alpha: true
  });
  renderer.setPixelRatio(window.devicePixelRatio); // window.devicePixelRatio/2 to render in half resolution
  renderer.setSize(Math.min(window.innerWidth, contentWidth), window.innerHeight);

  return renderer;
}

/* Creates the canvas in Render */
function initializeCanvas() {

  const canvas = document.createElement("canvas");
  canvas.style.position = "absolute";
  canvas.style.left = "50%";
  canvas.style.marginLeft = `${-contentWidth/2}px`;
  canvas.style.width = contentWidth;
  canvas.style.height = "100%";
  canvas.style.zIndex = -1;
  canvas.id = "main-canvas";
  document.querySelector('body').appendChild(canvas);
  return canvas;
}

/* Creates the observer in Render */
function initializeObserver(renderInfo) {
  const { figuresInView } = renderInfo;

  function renderOnce() {
    animate(renderInfo, true);
  }

  function handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        figuresInView.add(entry.target.figureInfo);
      } else {
        figuresInView.delete(entry.target.figureInfo);
      }
    });

    if (figuresInView.size > 0) {
      cancelAnimationFrame(renderInfo.requestId);
      animate(renderInfo);
      window.removeEventListener("scroll", renderOnce);
      window.addEventListener("scroll", renderOnce);
    } else {
      window.removeEventListener("scroll", renderOnce);
    }
  }

  return new IntersectionObserver(handleIntersection);
}

// updates the animations for each Figure and renders the next frame for each Figure (see extremely helpful post by gman here https://stackoverflow.com/questions/30608723/is-it-possible-to-enable-unbounded-number-of-renderers-in-three-js/30633132#30633132)
function animate(renderInfo, renderOnce) {
  stats.begin();
  const { renderer, figuresInView } = renderInfo;

  renderer.domElement.style.transform = `translateY(${window.scrollY}px)`;

  renderer.setClearColor(0xffffff);
  renderer.setScissorTest(false);
  renderer.clear();

  renderer.setClearColor(0xffffff);
  renderer.setScissorTest(true);

  figuresInView.forEach(figureInfo => {
    if (!figureInfo.scene || !figureInfo.div) {
      return;
    }
    const rect = figureInfo.div.getBoundingClientRect();


    // get location of the plot on the window
    const width = rect.right - rect.left;
    const height = rect.bottom - rect.top;
    const bottom = renderer.domElement.clientHeight - rect.bottom;

    // render only in that part of the window
    renderer.setViewport(contentWidth/2-width/2, bottom, width, height);
    renderer.setScissor(contentWidth/2-width/2, bottom, width, height);

    let now = new Date();
    figureInfo.animationFunctions.forEach(f => f((now - startTime) / 1000));

    renderer.render(figureInfo.scene, figureInfo.camera);
  });
  stats.end();

  if (
    !renderOnce &&
    [...figuresInView].some(x => x.animationFunctions.length > 0)
  ) {
    renderInfo.requestId = requestAnimationFrame(() => animate(renderInfo));
  }
}

export default Render;
export { RenderContext };
