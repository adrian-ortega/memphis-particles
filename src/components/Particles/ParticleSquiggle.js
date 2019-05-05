import AbstractParticleBase from '@/components/Particles/AbstractParticleBase';
import {getRandomFromArray, getRandomFromRange} from '@/util';

export default class ParticleSquiggle extends AbstractParticleBase
{
  init() {
    this.size = getRandomFromRange(0.1, 1, .1)
    this.width = 100 * this.size;
    this.height = 100 * this.size;
    this.type = getRandomFromArray([
      {style: 1, multiplier: 5},
      {style: 2, multiplier: 5},
    ]);

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

    const w = this.width / this.type.multiplier
    const h = this.height / this.type.multiplier

    const points = [];

    switch (this.type.style) {
      // Short
      case 1:
      points.push({x: 0, y: 0});
      points.push({x: 0, y: h});
      points.push({x: w * 2, y: h});
      points.push({x: w * 2, y: h * 3});
      points.push({x: w * 4, y: h * 3});
      points.push({x: w * 4, y: h * 5});
      points.push({x: w * 5, y: h * 5});
      points.push({x: w * 5, y: h * 2});
      points.push({x: w * 3, y: h * 2});
      points.push({x: w * 3, y: 0});
      points.push({x: 0, y: 0});
        break;
      // medium
      case 2:
        points.push({x: 0, y: h});
        points.push({x: w, y: h});
        points.push({x: w, y: h * 2});
        points.push({x: w * 2, y: h * 2});
        points.push({x: w * 2, y: h * 3});
        points.push({x: w * 3, y: h * 3});
        points.push({x: w * 3, y: h * 4});
        points.push({x: w * 4, y: h * 4});
        points.push({x: w * 4, y: h * 5});
        points.push({x: w * 6, y: h * 5});
        points.push({x: w * 6, y: h * 4});
        points.push({x: w * 5, y: h * 4});
        points.push({x: w * 5, y: h * 3});
        points.push({x: w * 4, y: h * 3});
        points.push({x: w * 4, y: h * 2});
        points.push({x: w * 3, y: h * 2});
        points.push({x: w * 3, y: h});
        points.push({x: w * 2, y: h});
        points.push({x: w * 2, y: 0});
        points.push({x: 0, y: 0});
        points.push({x: 0, y: h});
        break;
    }

    context.fillStyle = this.color.hex;
    context.translate(x + (this.width * 0.5), y + (this.height * 0.5));
    context.rotate(this.angle);

    context.moveTo(x, y);
    context.beginPath();
    points.forEach(({x, y}) => context.lineTo(x, y))
    context.closePath();
    context.fill();
  }
}
