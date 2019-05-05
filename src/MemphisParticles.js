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
   * @param backgroundColor
   * @param {number} max
   */
  constructor(selector, max = 70, backgroundColor = null) {
    this.max = max;
    this.canvas = document.querySelector(selector);
    this.context = this.canvas.getContext('2d');
    this.canvasWrapper = this.canvas.parentNode;
    this.particles = [];
    this.canvas.style.background = backgroundColor;

    this.setBackgroundColor(backgroundColor);
  }

  /**
   * @param {string} color
   * @return {MemphisParticles}
   */
  setBackgroundColor (color) {
    this.backgroundColor = color;

    if(color) {
      this.context.fillStyle = color;
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    return this;
  }

  /**
   * Initialize everything
   */
  init () {
    this.updateCanvasSize();
    this.generate();
    this.update();

    let resizing

    window.addEventListener('resize', () => {
      if (resizing) return

      resizing = setTimeout(() => {
        resizing = null
        this.updateCanvasSize()
      })
    }, true);

    let lastScrollPos = 0;
    this.scrollDirection = 0;

    setInterval(() => {
      if(lastScrollPos === window.scrollY) {
        this.scrollDirection = 0;
        return null;
      }

      this.scrollDirection = window.scrollY > lastScrollPos ? 1 : -1;
      lastScrollPos = window.scrollY;

      return null;
    }, 100);
  }

  /**
   * Changes the size of the canvas to match the full background wrapper
   */
  updateCanvasSize() {
    let width = this.canvasWrapper.offsetWidth
    let height = this.canvasWrapper.offsetHeight

    this.canvas.width = width * 2
    this.canvas.height = height * 2
    this.canvas.style.width = width + 'px'
    this.canvas.style.height = height + 'px';
  }

  /**
   * Adds particles
   */
  generate () {
    if(this.particles.length < this.max) {
      for(let i = this.particles.length; i < this.max; i++) {
        this.particles.push(new Particle(this.canvas, this.context, i));
      }
    }
  }

  /**
   * Updats all particle effects
   */
  update () {
    if(this.particles.length < this.max - 5) this.generate()

    // this.particles = this.particles.filter(particle => particle.update(this.scrollDirection))

    // Render the canvas
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.particles.forEach(particle => {
      particle.update(this.scrollDirection);
      particle.draw();
    });

    // DO IT AGAIN!
    requestAnimationFrame(() => this.update());
  }
}
