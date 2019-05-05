import {particleTypes} from '@/components/Particles';
import {getRandomFromArray, getRandomFromRange} from '@/util';
import Vector from '@/components/Vector'

export default class Particle {

  /**
   * @param {HTMLCanvasElement|Node} canvas
   * @param {CanvasRenderingContext2D} context
   * @param {number} index
   */
  constructor (canvas, context, index = 0) {
    this.index = index;
    this.canvas = canvas
    this.context = context

    this.inBounds = false
    this.coords = new Vector(
      Math.round(Math.random() * this.canvas.width),
      Math.round(Math.random() * this.canvas.height)
    );

    // Only moves up and down
    this.velocity = new Vector(
      0, //Math.random() * getRandomFromRange(0.1, 1.5, 0.1),
      Math.random() * getRandomFromRange(0.1, 2.5, 0.1)
    );

    let randomParticle = getRandomFromArray(particleTypes)
    this.particle = new randomParticle(this);

    // Validate the particle is allowed. This can be sued to make sure only a max amount
    // of one particular type is allowed to be drawn.
    while(!this.particle.init()) {
      randomParticle = getRandomFromArray(particleTypes)
      this.particle = new randomParticle(this);
    }
  }

  /**
   *
   * @return {*}
   */
  update (scrollDirection) {
    this.particle.update(scrollDirection);
    return this.withinBounds();
  }

  /**
   *
   */
  draw () {
    this.context.save();
    this.particle.draw();
    this.context.restore();
  }

  /**
   *
   * @return {boolean}
   */
  withinBounds () {
    let boundX = (this.canvas.width / 2 ) + 5
    let boundY = (this.canvas.height / 2) + 5
    let x = this.coords.x / 2
    let y = this.coords.y / 2

    this.inBounds = !((x > boundX || x < 0 - 5) || (y > boundY || y < 0 - 5))

    return this.inBounds
  }
}
