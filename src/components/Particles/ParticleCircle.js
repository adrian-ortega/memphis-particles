import AbstractParticleBase from '@/components/Particles/AbstractParticleBase'
import {getRandomFromArray, getRandomFromRange} from '@/util'

class ParticleCircle extends AbstractParticleBase {
  init () {
    this.type = getRandomFromArray(['solid', 'outline']);
    this.strokeWeight = getRandomFromRange(10, 30);
    this.diameter = getRandomFromRange(10, 100);

    if(this.type === 'solid' && ParticleCircle.largeCount < 3) {
      this.diameter = getRandomFromRange(3000, 5000, 500);
      this.setColor('#ffffff', getRandomFromRange(.1, .5, .125));
      ParticleCircle.largeCount++;
    }

    return super.init();
  }

  draw() {
    const {x, y} = this.getCoords()
    const context = this.getContext();

    context.translate(x, y);
    context.lineWidth = this.strokeWeight;
    context.beginPath();

    context.beginPath();
    context.arc(x, y, this.diameter, 0, Math.PI * 2, false);

    switch(this.type) {
      case 'solid':
        context.fillStyle = this.color.rgba;
        context.fill();
        break;
      case 'outline':
        context.strokeStyle = this.color.rgba;
        context.stroke();
        break;
    }
  }
}

ParticleCircle.largeCount = 0;

export default ParticleCircle;
