import { useContext, useEffect } from 'react';
import * as THREE from 'three';
import { FigureContext } from './Figure';
import katex from 'katex';
import domtoimage from 'dom-to-image';


function KaTeX(props) {

  const figureInfo  = useContext(FigureContext);
  const {position, string} = props;

  const vector = new THREE.Vector3(...position);

  const element = document.createElement('span');
  katex.render(string, element, {displayMode: true});
  element.style.position = 'absolute';
  document.body.appendChild(element);
  figureInfo.overlays.push({position: vector, element: element});

  return null;
}

KaTeX.defaultProps = {
  position: [0, 0, 0],
  string: ``,
}

export default KaTeX;