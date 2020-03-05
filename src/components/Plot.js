import React, { useEffect, useRef, useState } from "react";
import PlotlyPlot from "react-plotly.js";
import { InView } from "react-intersection-observer";


// wraps the Plot component from react-plotly.js with an observer that triggers a rerender if the plot is in view but its WebGL context has been lost
function Plot(props) {
  const { three } = props;
  if (!three) {
    return <Plot2d {...props} />;
  }

  // need to go back and change this to match the correct height and width passed down from props
  const placeholderStyle = { height: "400px", width: "400px" };

  // using inView instead of an intersection observer since I had some trouble getting the intersection observer to work
  const [comp, setComp] = useState(
    <InView as="div" onChange={handleInitialView}>
      <div style={placeholderStyle}></div>
    </InView>
  );

  function handleInitialView(inView) {
    if (inView) {
      setComp(<Plot3d {...props} />);
    }
  }

  return comp;
}

Plot.defaultProps = {
  data: [],
  layout: {},
  config: {},
  three: false
};

function Plot2d(props) {
  const { data, layout, config, style } = props;
  return (
    <PlotlyPlot data={data} layout={layout} config={config} style={style} />
  );
}

function Plot3d(props) {
  const { data, layout, config, style } = props;
  const ref = useRef();
  const [key, setKey] = useState(0);

  // I don't use inView here because this is, to my eye, a little faster
  useEffect(() => {
    function handleIntersection([entry]) {
      if (entry.isIntersecting) {
        // the react-plotly.js component Plot creates a particular set of nested dom elements; here we find the canvas in this set of dom elements
        const glContainer = ref.current
        .querySelector(".gl-container")
        if (!glContainer) {
          return
        }
        const canvas = glContainer.querySelector("canvas");
        if (canvas.getContext("webgl").isContextLost()) {
          setKey(key => key + 1); // passing a function to a state setter allows you to change the state based on its previous value
        }
      }
    }

    const observer = new IntersectionObserver(handleIntersection);
    observer.observe(ref.current);
  }, [ref]);

  return (
    <div ref={ref}>
      <PlotlyPlot
        key={key} // the observer callback function increments this key, thus causing a rerender
        data={data}
        layout={layout}
        config={config}
        style={style}
      />
    </div>);
}

export default Plot;
