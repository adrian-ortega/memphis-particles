import MemphisParticles from '@/MemphisParticles'
import {getRandomFromArray} from '@/util'

const backgroundColors = ['#d8ffd8', '#fcffde', '#c3d9ff', '#ffe8fc']
const urlParams = new URLSearchParams(window.location.search);
const count = urlParams.get('particles') || (window.innerWidth < 1024 ? 90 : 300);
const app = new MemphisParticles('#canvas-particles', count, getRandomFromArray(backgroundColors));

window.MP = app;
document.addEventListener('DOMContentLoaded', () => app.init())
