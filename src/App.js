import React from "react";
import Axes from "./components/Axes";
import HelloWorld from "./content/hello_world";
import LinearAlgebra from "./content/linear_algebra";
import TestContent from "./content/test_content";
import Plot from "react-plotly.js";
import ContentJS from './content/ContentJS';
// import LinearAlgebra from './content/LinearAlgebra';
import SimpleContent from './content/simple_content';

function App() {
  return (
    <div style={{ margin: "0 auto", width: "800px" }}>
      {/* <LinearAlgebra /> */}
      {/* <TestContent /> */}
      <SimpleContent />
    </div>
  );
}

export default App;
