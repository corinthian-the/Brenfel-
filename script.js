/* === MATRIX BACKGROUND === */
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
  ctx.fillStyle = "#00eaff";
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

/* === TYPING INTRO === */
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
    speak("Brenfel system initialized. Ready for input.");
  }
}
window.onload = typeText;

/* === SOUND TOGGLE === */
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

/* === ENTER SEQUENCE === */
enterBtn.addEventListener("click", () => {
  clickSound.play();
  speak("Access granted. Welcome back, Architect.");
  intro.classList.add("fade-out");
  setTimeout(() => {
    intro.style.display = "none";
    mainContent.classList.remove("hidden");
    startHolographicPulse();
  }, 1200);
});

/* === AI VOICE ENGINE === */
function speak(text) {
  if (!window.speechSynthesis) return;
  const msg = new SpeechSynthesisUtterance(text);
  msg.rate = 1.05;
  msg.pitch = 1.1;
  msg.volume = 0.9;
  msg.lang = "en-US";
  window.speechSynthesis.speak(msg);
}

/* === HOLOGRAPHIC PULSE === */
function startHolographicPulse() {
  const status = document.querySelector(".status");
  setInterval(() => {
    status.classList.toggle("glow");
  }, 1000);
}

/* === TERMINAL MODULE SYSTEM === */
const terminal = document.getElementById("terminal");
const moduleButtons = document.querySelectorAll(".module-btn");

const modules = {
  ai: [
    "[AI CORE] Neural link stable...",
    "[AI CORE] Thought synthesis: active.",
    "[AI CORE] Conscious loop engaged.",
    "[AI CORE] Monitoring user vitals..."
  ],
  network: [
    "[NETWORK] Quantum uplink established.",
    "[NETWORK] Nodes synchronized: 12 active.",
    "[NETWORK] Latency: 0.002ms",
    "[NETWORK] Stream encryption: 100%"
  ],
  data: [
    "[DATA VAULT] Retrieving classified archives...",
    "[DATA VAULT] Decrypting files...",
    "[DATA VAULT] Secure layer: Omega",
    "[DATA VAULT] Access authorized."
  ],
  control: [
    "[CONTROL PANEL] Power rerouting successful.",
    "[CONTROL PANEL] System load: 74%",
    "[CONTROL PANEL] Awaiting directives...",
    "[CONTROL PANEL] Standing by."
  ]
};

moduleButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    clickSound.play();
    const target = btn.getAttribute("data-target");
    displayModule(modules[target]);
    speak("Loading " + target + " module.");
  });
});

function displayModule(lines) {
  terminal.innerHTML = "";
  let i = 0;
  const interval = setInterval(() => {
    if (i < lines.length) {
      const p = document.createElement("p");
      p.textContent = lines[i];
      p.classList.add("glow-line");
      terminal.appendChild(p);
      terminal.scrollTop = terminal.scrollHeight;
      i++;
    } else {
      clearInterval(interval);
    }
  }, 600);
}
