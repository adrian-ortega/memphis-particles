import MemphisParticles from '@/MemphisParticles'

const urlParams = new URLSearchParams(window.location.search);
const count = urlParams.get('particles') || 300;
const app = new MemphisParticles('#canvas-particles', count, '#e3ffe4');

window.MP = app;
document.addEventListener('DOMContentLoaded', () => app.init())
