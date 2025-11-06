// MATRIX BACKGROUND
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const letters = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function draw() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#00ffff"; // cyan-blue color
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const text = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  }
}

setInterval(draw, 33);

// --------------------- INTRO LOGIC ---------------------

const typedText = document.getElementById("typed-text");
const enterBtn = document.getElementById("enter-btn");
const soundBtn = document.getElementById("sound-btn");
const intro = document.querySelector(".intro");
const boot = document.getElementById("boot-sequence");
const mainContent = document.getElementById("main-content");
const ambient = document.getElementById("ambient");
const clickSound = document.getElementById("click");

let text = "INITIALIZING BRENFEL SYSTEM_";
let i = 0;

// Typewriter effect
function typeEffect() {
  if (i < text.length) {
    typedText.textContent += text.charAt(i);
    i++;
    setTimeout(typeEffect, 100);
  } else {
    enterBtn.style.display = "inline-block";
    soundBtn.style.display = "inline-block";
  }
}

window.onload = typeEffect;

// Sound toggle
let soundOn = false;
soundBtn.onclick = () => {
  if (!soundOn) {
    ambient.play();
    soundBtn.textContent = "🔇 MUTE";
    soundOn = true;
  } else {
    ambient.pause();
    soundBtn.textContent = "🔊 SOUND";
    soundOn = false;
  }
};

// ENTER button → boot sequence
enterBtn.onclick = () => {
  clickSound.play();
  intro.style.display = "none";
  boot.classList.remove("hidden");
  runBootSequence();
};

// --------------------- BOOT SEQUENCE ---------------------
const bootText = document.getElementById("boot-text");
const progressBar = document.querySelector(".progress-bar");

const logs = [
  "[OK] System kernel loaded...",
  "[OK] Neural modules online...",
  "[OK] Cipher core active...",
  "[OK] Visual matrix stable...",
  "[OK] Authentication verified...",
  "[OK] Launching interface..."
];

function runBootSequence() {
  let line = 0;
  let progress = 0;

  const bootInterval = setInterval(() => {
    if (line < logs.length) {
      bootText.textContent += logs[line] + "\n";
      line++;
      progress += 100 / logs.length;
      progressBar.style.width = progress + "%";
    } else {
      clearInterval(bootInterval);
      setTimeout(() => {
        boot.classList.add("hidden");
        mainContent.classList.remove("hidden");
      }, 1000);
    }
  }, 800);
}


