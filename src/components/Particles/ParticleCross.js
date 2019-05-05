import AbstractParticleBase from '@/components/Particles/AbstractParticleBase';
import {getRandomFromRange} from '@/util';

export default class ParticleCross extends AbstractParticleBase
{
  init() {
    this.size = getRandomFromRange(.5, .6, .1)
    this.width = 100 * this.size;
    this.height = 100 * this.size;

    return super.init();
  }

  draw () {
    const {x, y} = this.getCoords();
    const context = this.getContext();
    const w = this.width / 5;
    const h = this.height / 5;
    const points = [
      {x: w, y: 0},
      {x: w * 4, y: 0},
      {x: w * 4, y: h},
      {x: w * 5, y: h},
      {x: w * 5, y: h * 4},
      {x: w * 4, y: h * 4},
      {x: w * 4, y: h * 5},
      {x: w, y: h * 5},
      {x: w, y: h * 4},
      {x: 0, y: h * 4},
      {x: 0, y: h},
      {x: w, y: h},
      {x: w, y: 0},
    ];

    context.fillStyle = this.color.hex;
    context.rotate(this.angle);
    context.beginPath();
    context.moveTo(x, y);

    points.forEach(({x, y}) => context.lineTo(x, y));

    context.closePath();
    context.fill();
  }
}
