import {types} from '@/components/Particles';
import {randomFromArray} from '@/util';
import Vector from '@/components/Vector'

export default class Particle {

  /**
   * @param {HTMLCanvasElement} canvas
   * @param {CanvasRenderingContext2D} context
   */
  constructor (canvas, context) {
    this.canvas = canvas
    this.context = context

    this.inBounds = false
    this.coords = new Vector(
      Math.round(Math.random() * this.canvas.width),
      Math.round(Math.random() * this.canvas.height)
    );

    const randomParticle = randomFromArray(types)
    this.particle = new randomParticle(this);

    this.velocity = !this.particle.moves
      ? null
      : new Vector(
        (Math.random() < 0.5 ? -1 : 1) * (Math.random() * 0.7),
        (Math.random() < 0.5 ? -1 : 1) * (Math.random() * 0.7)
      );

    this.particle.init();
  }

  /**
   *
   * @return {*}
   */
  update () {

    if(this.velocity) {
      this.coords.increase(this.velocity)
    }

    this.particle.update();
    return this.withinBounds()
  }

  /**
   *
   */
  draw () {
    this.particle.draw();
    this.context.stroke()
    this.context.restore()
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
