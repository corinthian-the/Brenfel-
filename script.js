// ===== MATRIX EFFECT (BLUE) =====
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
  ctx.fillStyle = '#00f'; // blue color
  ctx.font = fontSize + 'px monospace';
  for(let i = 0; i < drops.length; i++) {
    const text = letters.charAt(Math.floor(Math.random() * letters.length));
    ctx.fillText(text, i * fontSize, drops[i]);
    drops[i] += fontSize;
    if(drops[i] > canvas.height && Math.random() > 0.975) drops[i] = 0;
  }
}
setInterval(drawMatrix, 50);

// ===== AI VOICE =====
const phrases = [
  "Hello! I am Brenfel, your AI assistant.",
  "Welcome to the system.",
  "Brenfel is online and ready.",
  "How can I assist you today?",
  "The Matrix is alive and running."
];

function speakAI(text){
  const synth = window.speechSynthesis;
  const utter = new SpeechSynthesisUtterance(text);
  synth.speak(utter);
}

// ===== AUTO-GREETING ON PAGE LOAD =====
window.addEventListener('load', () => {
  const phrase = phrases[Math.floor(Math.random() * phrases.length)];
  speakAI(phrase);
});

// SOUND BUTTON
const soundBtn = document.getElementById('sound-btn');
soundBtn.addEventListener('click', () => {
  const phrase = phrases[Math.floor(Math.random() * phrases.length)];
  speakAI(phrase);
});
