// Matrix setup
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const letters = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function draw() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#00ffff";
  ctx.font = fontSize + "px monospace";
  for (let i = 0; i < drops.length; i++) {
    const text = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  }
}
setInterval(draw, 40);

// --- Interaction Logic ---
const enterBtn = document.getElementById("enter-btn");
const soundBtn = document.getElementById("sound-btn");
const intro = document.querySelector(".intro");
const mainContent = document.getElementById("main-content");
const ambient = document.getElementById("ambient");
const click = document.getElementById("click");

enterBtn.addEventListener("click", () => {
  click.play();
  intro.classList.add("fade-out");
  setTimeout(() => {
    intro.style.display = "none";
    mainContent.classList.remove("hidden");
  }, 1000);
});

soundBtn.addEventListener("click", () => {
  if (ambient.paused) {
    ambient.play();
    soundBtn.textContent = "🔇 SOUND OFF";
  } else {
    ambient.pause();
    soundBtn.textContent = "🔊 SOUND ON";
  }
});

// Typing effect
const text = "INITIALIZING BRENFEL SYSTEM...";
let index = 0;
const typedText = document.getElementById("typed-text");

function typeEffect() {
  if (index < text.length) {
    typedText.textContent += text.charAt(index);
    index++;
    setTimeout(typeEffect, 100);
  }
}
typeEffect();
