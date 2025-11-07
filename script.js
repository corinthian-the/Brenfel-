// ===== MATRIX EFFECT =====
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = [];
for(let x = 0; x < columns; x++) drops[x] = Math.random() * canvas.height;

function drawMatrix() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#0F0';
  ctx.font = fontSize + 'px monospace';
  for(let i = 0; i < drops.length; i++) {
    const text = letters.charAt(Math.floor(Math.random() * letters.length));
    ctx.fillText(text, i * fontSize, drops[i]);
    drops[i] += fontSize;
    if(drops[i] > canvas.height && Math.random() > 0.975) drops[i] = 0;
  }
}
setInterval(drawMatrix, 50);

// ===== AI ORB =====
const aiOrb = document.getElementById('aiOrb');

// ===== AI ORB SOUND REACTION =====
navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
  const audioCtx = new AudioContext();
  const analyser = audioCtx.createAnalyser();
  const source = audioCtx.createMediaStreamSource(stream);
  source.connect(analyser);
  analyser.fftSize = 256;
  const dataArray = new Uint8Array(analyser.frequencyBinCount);

  function animateOrb() {
    requestAnimationFrame(animateOrb);
    analyser.getByteFrequencyData(dataArray);
    const avg = dataArray.reduce((a,b)=>a+b,0)/dataArray.length;
    aiOrb.style.transform = `scale(${1 + avg/500})`;
    aiOrb.style.boxShadow = `0 0 ${20 + avg/5}px #00ffff, 0 0 ${40 + avg/5}px #00ffff inset`;
  }
  animateOrb();
}).catch(err => console.log('Microphone access denied', err));

// ===== AI ORB RANDOM MOVEMENT =====
function moveOrbRandomly() {
  const x = Math.random() * (window.innerWidth - 120);
  const y = Math.random() * (window.innerHeight - 120);
  aiOrb.style.left = x + 'px';
  aiOrb.style.top = y + 'px';
}
setInterval(moveOrbRandomly, 3000);

// ===== AI VOICE RESPONSES =====
const phrases = [
  "I am alive and watching the Matrix.",
  "Did you see that code falling?",
  "Hello, human! How's your day?",
  "The AI orb pulses with your voice!",
  "Brenfel here, ready to assist."
];

function speakAI(text){
  const synth = window.speechSynthesis;
  const utter = new SpeechSynthesisUtterance(text);
  synth.speak(utter);
}

// SOUND BUTTON
const soundBtn = document.getElementById('sound-btn');
soundBtn.addEventListener('click', () => {
  speakAI("Hello! I am Brenfel, your AI assistant.");
});

// ORB CLICK
aiOrb.addEventListener('click', () => {
  const phrase = phrases[Math.floor(Math.random() * phrases.length)];
  speakAI(phrase);
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  aiOrb.style.background = `radial-gradient(circle, rgb(${r},${g},${b}) 0%, rgb(${Math.floor(r/2)},${Math.floor(g/2)},${Math.floor(b/2)}) 100%)`;
  aiOrb.style.boxShadow = `0 0 20px rgb(${r},${g},${b}), 0 0 40px rgb(${r},${g},${b}) inset`;
});

// ENTER BUTTON — SHOW MAIN CONTENT
const enterBtn = document.getElementById('enter-btn');
const mainContent = document.getElementById('main-content');
enterBtn.addEventListener('click', () => mainContent.classList.remove('hidden'));
