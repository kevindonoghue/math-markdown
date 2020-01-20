import React, { useEffect, useRef, useState } from "react";
import Plot from "react-plotly.js";


// this component contains an observer that triggers a rerender if the plot is in view but its WebGL context has been lost
function Plot3d(props) {
  const { data, layout, config } = props;
  const ref = useRef();
  const [key, setKey] = useState(0);

  useEffect(() => {
    function handleIntersection([entry]) {
      if (entry.isIntersecting) {
        // the react-plotly.js component Plot creates a particular set of nested dom elements; here we find the canvas in this set of dom elements
        const canvas = ref.current.querySelector(".gl-container").querySelector("canvas");
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
      <Plot
        key={key} // the observer callback function increments this key, thus causing a rerender
        data={data}
        layout={layout}
        config={config}
      />
    </div>
  );
}


export default Plot3d;
