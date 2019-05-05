import AbstractParticleBase from '@/components/Particles/AbstractParticleBase'
import {getRandomFromRange} from '@/util'

export default class ParticleTriangle extends AbstractParticleBase {
  init() {
    this.size = getRandomFromRange(.1, .8, .05)
    this.width = 180 * this.size;
    this.height = 180 * this.size;

    return super.init();
  }

  draw() {
    const {x, y} = this.getCoords();
    const context = this.getContext();
    const w = this.width
    const h = this.height

    const points = [
      {x: 0, y: h},
      {x: w / 2, y: 0},
      {x: w, y: h},
      {x: 0, y: h},
    ];

    if(this.alpha !== 1) {
      context.globalAlpha = this.alpha;
    }

    context.fillStyle = this.color.hex;
    context.rotate(this.angle);
    context.beginPath();
    context.moveTo(x, y);

    points.forEach(({x, y}) => context.lineTo(x, y))

    context.closePath();
    context.fill();
  }
}
