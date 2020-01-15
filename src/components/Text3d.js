import { useContext } from 'react';
import * as THREE from 'three';
import { FigureContext } from './Figure';


function Text3d(props) {

  const {content, position, color, anchor, textSize} = props;
  const figureInfo = useContext(FigureContext);
  const scale = figureInfo.scale;
  const textScalingFactor = scale*0.2*textSize;

  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  // increase fontSize to change sharpness of text
  const fontSize = 100;
  const font = `${fontSize}px monospace`;
  context.font = font;
  const width = context.measureText(content).width;
  const height = fontSize;
  
  // make the canvas twice as big as you need so you can do upper-left, lower-right, etc
  canvas.width = 2*width;
  canvas.height = 2*height;

  // need to redeclare font since setting canvas.width and canvas.height resets it
  context.font = font;
  context.fillStyle = color;

  if (anchor === 'center') {
    context.textAlign = "center";
    context.textBaseline = "middle";
  } else if (anchor === 'upper-left') {
    context.textAlign = "left";
    context.textBaseline = "top";
  } else if (anchor === 'lower-left') {
    context.textAlign = "left";
    context.textBaseline = "bottom";
  } else if (anchor === 'upper-right') {
    context.textAlign = 'right';
    context.textBaseline = 'top';
  } else if (anchor === 'lower-right') {
    context.textAlign = 'right';
    context.textBaseLine = 'bottom';
  }
  context.fillText(content, canvas.width / 2, canvas.height / 2);

  const texture = new THREE.CanvasTexture( canvas );
  const material = new THREE.SpriteMaterial({ map: texture });
  const sprite = new THREE.Sprite(material);
  sprite.position.set(...position);
  sprite.scale.set(textScalingFactor*width/fontSize, textScalingFactor, 1);

  figureInfo.scene.add(sprite);

  return null;
}

Text3d.defaultProps = {
  content: '',
  position: [0, 0, 0],
  anchor: 'center',
  color: 'black',
  textSize: 1,
}

export default Text3d;