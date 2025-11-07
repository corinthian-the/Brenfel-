/* === MATRIX ANIMATION === */
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const letters = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#00ffff";
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const text = letters.charAt(Math.floor(Math.random() * letters.length));
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  }
}
setInterval(drawMatrix, 35);

window.addEventListener("resize", () => {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
});

/* === TYPING EFFECT === */
const typedText = document.getElementById("typed-text");
const intro = document.querySelector(".intro");
const mainContent = document.getElementById("main-content");
const enterBtn = document.getElementById("enter-btn");
const soundBtn = document.getElementById("sound-btn");
const ambient = document.getElementById("ambient");
const clickSound = document.getElementById("click");

const introMessage = "INITIALIZING BRENFEL SYSTEM...";
let index = 0;

function typeText() {
  if (index < introMessage.length) {
    typedText.textContent += introMessage.charAt(index);
    index++;
    setTimeout(typeText, 70);
  } else {
    document.querySelector(".buttons").style.display = "block";
  }
}
window.onload = typeText;

/* === SOUND BUTTON === */
soundBtn.addEventListener("click", () => {
  clickSound.play();
  if (ambient.paused) {
    ambient.volume = 0.5;
    ambient.play();
    soundBtn.textContent = "🔈 MUTE";
  } else {
    ambient.pause();
    soundBtn.textContent = "🔊 SOUND";
  }
});

/* === ENTER BUTTON === */
enterBtn.addEventListener("click", () => {
  clickSound.play();
  intro.classList.add("fade-out");
  setTimeout(() => {
    intro.style.display = "none";
    mainContent.classList.remove("hidden");
  }, 1000);
});

/* === MODULE TERMINAL === */
const terminal = document.getElementById("terminal");
const moduleButtons = document.querySelectorAll(".module-btn");

const modules = {
  ai: [
    "[AI CORE] Neural routines stable...",
    "[AI CORE] Thought synthesis online.",
    "[AI CORE] Sentience level: 84.7%",
    "[AI CORE] Monitoring user behavior..."
  ],
  network: [
    "[NETWORK] Establishing quantum uplink...",
    "[NETWORK] Connection to node-14 secured.",
    "[NETWORK] Data streams synchronized.",
    "[NETWORK] Latency: 0.003ms"
  ],
  data: [
    "[DATA] Retrieving encrypted files...",
    "[DATA] Access granted to sector-7 logs.",
    "[DATA] 15.4TB indexed.",
    "[DATA] Threat scan: 0 anomalies detected."
  ],
  control: [
    "[CONTROL PANEL] Power allocation: 87%",
    "[CONTROL PANEL] Subsystems nominal.",
    "[CONTROL PANEL] Awaiting command input...",
    "[CONTROL PANEL] User privilege: Architect"
  ]
};

moduleButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    clickSound.play();
    const target = btn.getAttribute("data-target");
    displayModule(modules[target]);
  });
});

function displayModule(lines) {
  terminal.innerHTML = "";
  let i = 0;
  const interval = setInterval(() => {
    if (i < lines.length) {
      const p = document.createElement("p");
      p.textContent = lines[i];
      terminal.appendChild(p);
      terminal.scrollTop = terminal.scrollHeight;
      i++;
    } else {
      clearInterval(interval);
    }
  }, 600);
}
