import React from "react";
import Axes from './components/Axes';
import TestObject from './components/TestObject'

// function App() {
//   return (
//     <Render>
//       <HelloWorld />
//       <Figure dim={3}>
//         <Axes3d
//           bounds={[
//             [-3, 3],
//             [-3, 3],
//             [-3, 3]
//           ]}
//         />
//         {[
//           [1, 2, 1],
//           [-1, -1, 0]
//         ].map((center, i) => (
//           <Cube key={i} center={center} />
//         ))}
//         <KaTeX position={[2, 0, 0]} string={String.raw`x^2`} />
//       </Figure>
//       <Figure dim={3}>
//         <Axes3d
//           bounds={[
//             [-2, 2],
//             [-2, 2],
//             [-2, 2]
//           ]}
//           tickSpacing={[0.5, 0.5, 0.5]}
//         />
//         <KaTeX position={[-1, 0, 0]} string={String.raw`x^3`}/>
//         <Text3d content={'abcdefghijklmnopqrstuvwxyz'} position={[0, 0, 0.2]} scale={1} anchor={'lower-right'}/>
//         <AnimatedCube center={[0.5, 0.25, 0.1]} sideLength={0.3} />
//         <Cube center={[0, 0, 0.3]} sideLength={0.1} />
//       </Figure>
//       <Figure dim={3}>
//         <AnimatedCube />
//       </Figure>
//       <Figure dim={3}>
//         <Cube />
//         <Cube />
//         <Cube />
//         <Cube />
//       </Figure>
//       <Figure dim={3}>
//         <Cube />
//         <Cube />
//         <Cube />
//         <Cube />
//       </Figure>
//       <Figure dim={3}>
//         <Cube />
//         <Cube />
//         <Cube />
//         <Cube />
//       </Figure>
//       <Figure dim={3}>
//         <Cube />
//         <Cube />
//         <Cube />
//         <Cube />
//       </Figure>
//       <Figure dim={3}>
//         <Cube />
//         <Cube />
//         <Cube />
//         <Cube />
//       </Figure>
//     </Render>
//   );
// }

function App() {
  
  return (
    <div>
      <Axes dim={3} bounds={[[-2, 5], [-2, 5], [-2, 5]]} >
        <TestObject />
      </Axes>
    </div>
  );
}

export default App;
