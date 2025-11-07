// === Floating AI Orb Follows Mouse + Reacts to Sound ===
const aiOrb = document.getElementById('aiOrb');
const orbCore = aiOrb.querySelector('.orb-core');
const ambient = document.getElementById('ambient');
let orbX = window.innerWidth * 0.8;
let orbY = window.innerHeight * 0.8;

// Smooth mouse follow
document.addEventListener('mousemove', (e) => {
  orbX += (e.clientX - orbX) * 0.02;
  orbY += (e.clientY - orbY) * 0.02;
  aiOrb.style.transform = `translate(${orbX - 60}px, ${orbY - 60}px)`;
});

// === AUDIO REACTIVE ORB ===
let audioCtx, analyser, source, dataArray;

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
  let avg = dataArray.reduce((a, b) => a + b) / dataArray.length;
  let intensity = avg / 255;

  // Pulse glow with sound
  orbCore.style.transform = `scale(${1 + intensity * 0.6})`;
  orbCore.style.boxShadow = `
    0 0 ${30 + intensity * 60}px rgba(0, 255, 255, 0.8),
    0 0 ${80 + intensity * 120}px rgba(0, 255, 255, 0.5)
  `;
  orbCore.style.background = `
    radial-gradient(circle, rgba(0,255,255,${0.4 + intensity * 0.6}) 20%, transparent 70%)
  `;
}

// Hook sound button
document.getElementById('sound-btn').addEventListener('click', async () => {
  setupAudioReactivity();
  await audioCtx.resume();
  ambient.play();
  animateOrb();
});
