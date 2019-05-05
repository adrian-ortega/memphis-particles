import AbstractParticleBase from '@/components/Particles/AbstractParticleBase';
import {getRandomFromArray} from '@/util';

export default class ParticleSquiggle extends AbstractParticleBase
{
  init() {
    this.size = getRandomFromArray([.3, .4, .5, .6, .7, .8])
    this.width = 100 * this.size;
    this.height = 100 * this.size;
    this.type = getRandomFromArray([
      {style: 1, multiplier: 5},
      {style: 2, multiplier: 5},
    ]);

    return super.init();
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
    context.rotate(this.angle);
    context.beginPath();
    context.moveTo(x, y);
    points.forEach(({x, y}) => context.lineTo(x, y))
    context.closePath();
    context.fill();
  }
}
