import AbstractParticleBase from '@/components/Particles/AbstractParticleBase'
import {getRandomFromRange} from '@/util'

class ParticleTriangle extends AbstractParticleBase {
  init() {
    this.size = getRandomFromRange(.1, .8, .05)
    this.width = 180 * this.size;
    this.height = 180 * this.size;

    if(ParticleTriangle.largeCount < 4) {
      const tmpSize = getRandomFromRange(3000, 5000, 500);
      this.width = tmpSize;
      this.height = tmpSize;
      this.alpha = getRandomFromRange(.1, .5, .125);
      ParticleTriangle.largeCount++;
    }

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

    context.translate(x, y);
    context.fillStyle = this.color.hex;
    context.rotate(this.angle);
    context.beginPath();
    context.moveTo(x, y);

    points.forEach(({x, y}) => context.lineTo(x, y))

    context.closePath();
    context.fill();
  }
}

ParticleTriangle.largeCount = 0;

export default ParticleTriangle
