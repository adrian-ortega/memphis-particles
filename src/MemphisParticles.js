import Particle from '@/components/Particle'

/**
 * @property {number} max
 * @property {null|HTMLCanvasElement|Node} canvas
 * @property {null|HTMLDivElement|HTMLElement|Node} canvasWrapper
 * @property {null|CanvasRenderingContext2D} context
 * @property {Array|Particle[]} particles
 */
export default class MemphisParticles {
  /**
   * @param {String} selector
   * @param {number} max
   */
  constructor(selector, max = 70) {
    this.max = max;
    this.canvas = document.querySelector(selector);
    this.context = this.canvas.getContext('2d');
    this.canvasWrapper = this.canvas.parentNode;
    this.particles = []
  }

  /**
   *
   */
  init () {
    this.updateCanvasSize();
    this.generate();
    this.update();

    window.addEventListener('resize', () => this.updateCanvasSize());
  }

  /**
   *
   */
  updateCanvasSize() {
    this.canvas.width = this.canvasWrapper.offsetWidth * 2
    this.canvas.height = this.canvasWrapper.offsetHeight * 2
    this.canvas.style.width = this.canvasWrapper.offsetWidth + 'px'
    this.canvas.style.height = this.canvasWrapper.offsetHeight + 'px'
  }

  /**
   *
   */
  generate () {
    if(this.particles.length < this.max) {
      for(let i = this.particles.length; i < this.max; i++) {
        this.particles.push(new Particle(this.canvas, this.context));
      }
    }
  }

  update () {
    if(this.particles.length < this.max - 5) this.generate()

    this.particles = this.particles.filter(particle => particle.update())

    // Render the canvas
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.particles.forEach(particle => particle.draw())

    // DO IT AGAIN!
    requestAnimationFrame(() => this.update())
  }
}
