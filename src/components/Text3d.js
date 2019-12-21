import { useContext } from 'react';
import * as THREE from 'three';
import { FigureContext } from './Figure';

function Text3d() {
  const figureInfo = useContext(FigureContext);

  const fontSize = 14;

  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 32;

  const context = canvas.getContext('2d');
  context.fillStyle = 'black';
  context.font = fontSize + 'px monospace';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText('hello, world!', 0.5*canvas.width, 0.5*canvas.height);

  const texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;
  const material = new THREE.SpriteMaterial({map: texture});
  const sprite = new THREE.Sprite(material);
  sprite.position.set(0, 0, 0)
  sprite.scale.set(1, 0.25)
  
  figureInfo.scene.add(sprite);

  return null;
}

export default Text3d;