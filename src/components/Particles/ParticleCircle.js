import AbstractParticleBase from '@/components/Particles/AbstractParticleBase'
import {getRandomFromArray, getRandomFromRange} from '@/util'

export default class ParticleCircle extends AbstractParticleBase {
  init () {
    this.type = getRandomFromArray(['solid', 'outline']);
    this.strokeWeight = getRandomFromRange(10, 30);
    this.diameter = getRandomFromRange(50, 150);

    return super.init();
  }

  draw() {
    const {x, y} = this.getCoords()
    const context = this.getContext();

    context.lineWidth = this.strokeWeight;
    context.rotate(-45);
    context.beginPath();

    context.beginPath();
    context.arc(x, y, this.diameter, 0, Math.PI * 2, false);

    switch(this.type) {
      case 'solid':
        context.fillStyle = this.color.hex;
        context.fill();
        break;
      case 'outline':
        context.strokeStyle = this.color.rgba;
        context.stroke();
        break;
    }
  }
}
