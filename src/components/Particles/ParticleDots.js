import AbstractParticleBase from '@/components/Particles/AbstractParticleBase';
import {getRandomFromRange} from '@/util';

class ParticleDots extends AbstractParticleBase {
  constructor (instance) {
    super(instance);
    ParticleDots.count++;
  }

  init() {
    this.size = getRandomFromRange(.3, .8, .1)
    this.width = 80 * this.size;
    this.height = 80 * this.size;
    this.diameter = this.width / 7;

    return ParticleDots.count < 10;
  }

  setupColors() {
    this.colors = ['#000000'];
  }

  draw() {
    const {x, y} = this.getCoords();
    const context = this.getContext();

    const d1 = this.diameter;
    const d2 = this.diameter * 7;
    const d3 = this.diameter * 13;
    const d4 = this.diameter * 19;
    const d5 = this.diameter * 25;

    const points = [
      {x: d1, y: d1},
      {x: d1, y: d2},
      {x: d1, y: d3},
      {x: d1, y: d4},
      {x: d1, y: d5},

      {x: d2, y: d1},
      {x: d2, y: d2},
      {x: d2, y: d3},
      {x: d2, y: d4},
      {x: d2, y: d5},

      {x: d3, y: d1},
      {x: d3, y: d2},
      {x: d3, y: d3},
      {x: d3, y: d4},
      {x: d3, y: d5},

      {x: d4, y: d1},
      {x: d4, y: d2},
      {x: d4, y: d3},
      {x: d4, y: d4},
      {x: d4, y: d5},

      {x: d5, y: d1},
      {x: d5, y: d2},
      {x: d5, y: d3},
      {x: d5, y: d4},
      {x: d5, y: d5},
    ];

    context.translate(x, y);
    context.fillStyle = this.color.hex;
    context.rotate(this.angle);
    points.forEach(({x, y}) => {
      context.beginPath();
      context.arc(x, y, this.diameter, 0, Math.PI * 2, false);
      context.fill();
    });
  }
}

ParticleDots.count = 0;

export default ParticleDots;
