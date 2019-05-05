import AbstractParticleBase from '@/components/Particles/AbstractParticleBase'
import {getRandomBetween, getRandomFromArray, getRandomFromRange} from '@/util'

export default class ParticleLines extends AbstractParticleBase {
  init () {
    this.length = getRandomFromRange(100, 250);
    const count = getRandomFromRange(3, 6);
    this.lines = (new Array(count)).fill(0).map((v, idx) => this.length * ((1 / count) * idx));
    this.strokeWeight = getRandomFromRange(1, 5);
    this.space = this.strokeWeight * getRandomFromRange(5, 10);
    this.alpha = getRandomFromRange(0.1, 1, 0.05);

    return super.init();
  }

  draw () {
    const context = this.getContext();

    context.lineWidth = this.strokeWeight;
    context.strokeStyle = this.color.rgba;
    context.rotate(-45);
    context.beginPath();

    this.lines.forEach((length, idx) => {
      context.moveTo(-length, this.space * idx);
      context.lineTo(length, this.space * idx);
    });

    context.stroke();
  }
}
