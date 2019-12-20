import React, { useRef, useEffect } from "react";
import Render from "./components/Render";
import Figure from "./components/Figure";
import Cube from "./components/Cube";
import AnimatedCube from "./components/AnimatedCube";
import Axes3d from "./components/Axes3d";
import Axes2d from './components/Axes2d';
import * as THREE from "three";
import HelloWorld from "./content/hello_world";

function App() {
  return (
    <Render>
      <HelloWorld />
      <Figure dim={3}>
        <Axes3d
          bounds={[
            [-3, 3],
            [-3, 3],
            [-3, 3]
          ]}
        />
        {[
          [1, 2, 1],
          [-1, -1, 0]
        ].map((center, i) => (
          <Cube key={i} center={center} />
        ))}
      </Figure>
      <Figure dim={3}>
        <Axes3d
          bounds={[
            [-2, 2],
            [-2, 2],
            [-2, 2]
          ]}
          tickSpacing={0.5}
        />
        <AnimatedCube center={[0.5, 0.25, 0.1]} sideLength={0.3} />
        <Cube center={[0, 0, 0.3]} sideLength={0.1} />
      </Figure>
      <Figure dim={3}>
        <AnimatedCube />
      </Figure>
      <Figure dim={3}>
        <Cube />
        <Cube />
        <Cube />
        <Cube />
      </Figure>
      <Figure dim={3}>
        <Cube />
        <Cube />
        <Cube />
        <Cube />
      </Figure>
      <Figure dim={3}>
        <Cube />
        <Cube />
        <Cube />
        <Cube />
      </Figure>
      <Figure dim={3}>
        <Cube />
        <Cube />
        <Cube />
        <Cube />
      </Figure>
      <Figure dim={3}>
        <Cube />
        <Cube />
        <Cube />
        <Cube />
      </Figure>
    </Render>
  );
}

export default App;
