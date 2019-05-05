import AbstractParticleBase from '@/components/Particles/AbstractParticleBase'
import {getRandomFromArray, getRandomFromRange, getRGBAFromHex} from '@/util'

export default class ParticleFancySquare extends AbstractParticleBase {
  init() {
    this.size = getRandomFromRange(.3, 1, .1)
    this.width = 100 * this.size;
    this.height = 100 * this.size;

    this.randomColor1 = getRandomFromArray(this.colors);
    this.randomColor2 = getRandomFromArray(this.colors);

    while(this.randomColor1 === this.randomColor2) {
      this.randomColor2 = getRandomFromArray(this.colors);
    }

    return super.init();
  }

  update(scrollDirection) {
    if(scrollDirection && this.clockwise) {
      this.angle += .008 * scrollDirection;
    }

    if(scrollDirection && !this.clockwise) {
      this.angle -= .008 * scrollDirection;
    }

    super.update(scrollDirection);
  }

  draw () {
    const {x, y} = this.getCoords();
    const context = this.getContext();
    const w = this.width / 5;
    const h = this.height / 5;

    const shapes = [
      {
        color: {
          hex: this.randomColor1,
          rgba: getRGBAFromHex(this.randomColor1, this.alpha)
        },
        points: [
          {x: 0, y: 0},
          {x: w * 5, y: 0},
          {x: 0, y: h * 5},
          {x: 0, y: 0},
        ]
      },
      {
        color: {
          hex: this.randomColor2,
          rgba: getRGBAFromHex(this.randomColor2, this.alpha)
        },
        points: [
          {x: w, y: h * 5},
          {x: w * 5, y: h},
          {x: w * 5, y: h * 5},
          {x: 2, y: h * 5}
        ]
      }
    ];

    context.translate(x + this.width / 2, y + this.height / 2);
    context.rotate(this.angle);
    context.moveTo(x, y);

    shapes.forEach((shape) => {
      context.beginPath();
      context.fillStyle = shape.color.rgba;
      shape.points.forEach(({x, y}) => context.lineTo(x, y))
      context.closePath();
      context.fill();
    });
  }
}
