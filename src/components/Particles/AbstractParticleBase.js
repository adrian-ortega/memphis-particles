/**
 * @property {Particle} instance
 * @property {Boolean} moves
 */
import {getRandomFromArray, getRGBAFromHex} from '@/util'

export default class AbstractParticleBase {
  /**
   * @param {Particle} instance
   */
  constructor (instance) {
    this.instance = instance;
    this.width = 100;
    this.height = 100;
    this.strokeWeight = 0;
    this.clockwise = Math.random() < 0.5;
    this.angle = Math.atan2(instance.coords.y, instance.coords.x);
    this.alpha = 1;

    if(this.clockwise) {
      this.angle = -Math.abs(this.angle);
    }

    this.setupColors();
    this.setColor(getRandomFromArray(this.colors));
  }

  setColor(randomColor, alpha = 1) {
    if(alpha) {
      this.alpha = alpha;
    }

    this.color = {
      hex: randomColor,
      rgba: getRGBAFromHex(randomColor, this.alpha)
    };
    return this;
  }

  setupColors () {
    this.colors = [
      '#D3489A',
      '#4BC1E9',
      '#F7F06C',
      '#340068',
      '#000000'
    ]
  }

  getContext () {
    return this.instance.context
  }

  getCoords () {
    return this.instance.coords
  }

  init () {
    return true;
  }

  update (scrollDirection) {
    if(scrollDirection) {
      const {coords, velocity} = this.instance;

      scrollDirection === 1
        ? coords.increase(velocity)
        : coords.decrease(velocity);
    }
  }

  draw() {
    throw new Error('Please override "draw" method in child class')
  }
}
