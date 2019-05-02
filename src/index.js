import MemphisParticles from './MemphisParticles'

const app =  new MemphisParticles('#canvas-particles')
document.addEventListener('DOMContentLoaded', () => init())

window.reloadParticles = (event) => {
  event.preventDefault()
  app.reload()
}

window.logParticles = (event, type = null) => {
  event.preventDefault()

  if(type === null) {
    console.log(state.particles)
    return
  }

  console.log(
    state.particles.filter(particle => particle.type === type)
  )
}
