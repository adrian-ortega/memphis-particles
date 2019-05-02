import MemphisParticles from '@/MemphisParticles'

console.log('Initializing Memphis Particles')

const app = new MemphisParticles('#canvas-particles')
window.MP = app;
document.addEventListener('DOMContentLoaded', () => app.init())
