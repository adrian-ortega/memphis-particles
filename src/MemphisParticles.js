import Particle from './components/Particle'

export default class MemphisParticles {
  max = 70;
  canvas = null;
  canvasWrapper = null;
  context = null;
  particles = [];
  particleTypes = [
    {
      type: '',
      colors: []
    }
  ];

  constructor(selector) {
    this.canvas = document.querySelector(selector);
    this.context = state.canvas.getContext('2d')
    this.canvasWrapper = this.canvas.parentNode
  }

  init () {
    this.updateCanvasSize()
    this.generate()
    this.update()

    window.addEventListener('resize', this.updateCanvasSize)
  }

  updateCanvasSize() {
    this.canvas.width = this.canvasWrapper.offsetWidth * 2
    this.canvas.height = this.canvasWrapper.offsetHeight * 2
    this.canvas.style.width = this.canvasWrapper.offsetWidth + 'px'
    this.canvas.style.height = this.canvasWrapper.offsetHeight + 'px'
  }

  generate () {
    let pids = 0
    if(this.particles.length < this.max) {
      for(let i = this.particles.length; i < this.max; i++) {
        this.particles.push(new Particle(pids++, this.particleTypes))
      }
    }
  }

  update () {
    if(this.particles.length < this.max - 5) generate()

    this.particles = this.particles.filter(particle => particle.update())

    // Render the canvas
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.particles.forEach(particle => particle.draw())

    // DO IT AGAIN!
    requestAnimationFrame(this.update)
  }

  reload () {
    this.particles = [];
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }
}
