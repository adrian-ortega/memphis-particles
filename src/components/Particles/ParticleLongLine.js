import _ from 'lodash';
import AbstractParticleBase from '@/components/Particles/AbstractParticleBase'
import {getRandomBetween, getRandomFromArray} from '@/util';

class ParticleLongLine extends AbstractParticleBase {
  constructor(instance) {
    super(instance);
    ParticleLongLine.count++;
  }

  init () {
    this.length = getRandomBetween(this.instance.canvas.height * .5, this.instance.canvas.height);
    this.strokeWeight = getRandomFromArray(_.range(1, 5));

    return ParticleLongLine.count < 5;
  }

  update (scrollDirection) {
    // does not move
  }

  draw () {
    const {x, y} = this.getCoords();
    const context = this.getContext();

    context.translate(x, y);
    context.lineWidth = this.strokeWeight;
    context.strokeStyle = this.color.rgba;
    context.rotate(-45);
    context.beginPath();

    context.moveTo(-this.length, 0);
    context.lineTo(this.length, 0);

    context.stroke();
  }
}

ParticleLongLine.count = 0;

export default ParticleLongLine;
