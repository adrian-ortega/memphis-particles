/**
 * @property {Particle} instance
 * @property {Boolean} moves
 */
export default class AbstractParticleBase {
  /**
   * @param {Particle} instance
   */
  constructor (instance) {
    this.instance = instance
    this.moves = true
  }

  init () {
    //
  }

  update () {

  }

  draw() {
    //
  }
}
