// ===== ENTER & SOUND BUTTONS =====
const enterBtn = document.getElementById('enter-btn');
const soundBtn = document.getElementById('sound-btn');
const mainContent = document.getElementById('main-content');
const ambient = document.getElementById('ambient');
const click = document.getElementById('click');

enterBtn.addEventListener('click', () => {
  mainContent.classList.remove('hidden');
  click.play();
  ambient.play();
});
soundBtn.addEventListener('click', () => {
  if (ambient.paused) ambient.play();
  else ambient.pause();
});

// ===== MATRIX BACKGROUND =====
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = 'アカサタナハマヤラワ0123456789ABCDEF';
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
  ctx.fillStyle = 'rgba(0,0,0,0.05)';
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = '#0ff';
  ctx.font = fontSize + 'px Orbitron';
  for (let i = 0; i < drops.length; i++) {
    const text = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillText(text, i*fontSize, drops[i]*fontSize);
    drops[i]++;
    if (drops[i]*fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
  }
}
setInterval(drawMatrix, 35);

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// ===== FLOATING AI ORB WITH AUDIO REACTIVITY =====
const aiOrb = document.getElementById('aiOrb');
const orbCore = aiOrb.querySelector('.orb-core');
let orbX = window.innerWidth*0.8;
let orbY = window.innerHeight*0.8;
let audioCtx, analyser, source, dataArray;

// Mouse follow
document.addEventListener('mousemove', (e) => {
  orbX += (e.clientX - orbX) * 0.1;
  orbY += (e.clientY - orbY) * 0.1;
  aiOrb.style.transform = `translate(${orbX-60}px, ${orbY-60}px)`;
});

// Audio reactive orb
function setupAudioReactivity() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    source = audioCtx.createMediaElementSource(ambient);
    analyser = audioCtx.createAnalyser();
    source.connect(analyser);
    analyser.connect(audioCtx.destination);
    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);
  }
}

function animateOrb() {
  if (!analyser) return;
  requestAnimationFrame(animateOrb);
  analyser.getByteFrequencyData(dataArray);
  let avg = dataArray.reduce((a,b)=>a+b)/dataArray.length;
  let intensity = avg/255;

  orbCore.style.transform = `scale(${1 + intensity*0.6})`;
  orbCore.style.boxShadow = `
    0 0 ${40 + intensity*60}px rgba(0,255,255,0.8),
    0 0 ${100 + intensity*120}px rgba(0,255,255,0.5)
  `;
  orbCore.style.background = `radial-gradient(circle, rgba(0,255,255,${0.4+intensity*0.6}) 20%, transparent 70%)`;
}

soundBtn.addEventListener('click', async () => {
  setupAudioReactivity();
  await audioCtx.resume();
  ambient.play();
  animateOrb();
});

