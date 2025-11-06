// Matrix setup
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
  ctx.fillStyle = "#00ffff";
  ctx.font = fontSize + "px monospace";
  for (let i = 0; i < drops.length; i++) {
    const text = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  }
}
setInterval(draw, 33);

// Typing effect
const message = "WELCOME TO BRENFEL — A WORLD BEYOND THE CODE_";
let index = 0;
const typedText = document.getElementById("typed-text");

function typeText() {
  if (index < message.length) {
    typedText.textContent += message[index];
    index++;
    setTimeout(typeText, 70);
  }
}
typeText();

// Button functions
const enterBtn = document.getElementById("enter-btn");
const soundBtn = document.getElementById("sound-btn");
const mainContent = document.getElementById("main-content");
const intro = document.querySelector(".intro");
const ambient = document.getElementById("ambient");
const clickSound = document.getElementById("click");

enterBtn.addEventListener("click", () => {
  clickSound.play();
  intro.classList.add("hidden");
  mainContent.classList.remove("hidden");
});

soundBtn.addEventListener("click", () => {
  if (ambient.paused) {
    ambient.play();
    soundBtn.textContent = "🔈 MUTE";
  } else {
    ambient.pause();
    soundBtn.textContent = "🔊 SOUND";
  }
});
