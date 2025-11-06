// ===== MATRIX BACKGROUND =====
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const letters = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
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
setInterval(drawMatrix, 40);

window.addEventListener("resize", () => {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
});

// ===== INTRO ANIMATION =====
const enterBtn = document.getElementById("enter-btn");
const soundBtn = document.getElementById("sound-btn");
const intro = document.querySelector(".intro");
const mainContent = document.getElementById("main-content");
const typedText = document.getElementById("typed-text");

const ambient = document.getElementById("ambient");
const click = document.getElementById("click");

let typingText = "INITIALIZING BRENFEL SYSTEM_";
let index = 0;

function typeEffect() {
  if (index < typingText.length) {
    typedText.textContent += typingText.charAt(index);
    index++;
    setTimeout(typeEffect, 100);
  }
}
typeEffect();

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
    soundBtn.textContent = "🔇 MUTE";
  } else {
    ambient.pause();
    soundBtn.textContent = "🔊 SOUND";
  }
});

// ===== TERMINAL SYSTEM =====
const terminal = document.getElementById("terminal");
const closeTerminal = document.getElementById("close-terminal");
const terminalOutput = document.getElementById("terminal-output");
const terminalInput = document.getElementById("terminal-input");

// Open terminal when clicking the System Core module
const coreModule = document.querySelector(".module:first-child");
coreModule.addEventListener("click", () => {
  terminal.classList.remove("hidden");
  terminalInput.focus();
});

// Close terminal
closeTerminal.addEventListener("click", () => {
  terminal.classList.add("hidden");
});

// Handle terminal commands
terminalInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const command = terminalInput.value.trim().toLowerCase();
    terminalInput.value = "";

    let response = "";
    switch (command) {
      case "help":
        response = "Available commands: help, status, clear, shutdown";
        break;
      case "status":
        response = "SYSTEM STATUS: All units operational. Matrix running smoothly.";
        break;
      case "clear":
        terminalOutput.innerHTML = "";
        return;
      case "shutdown":
        response = "Initiating system shutdown... Goodbye, Architect.";
        setTimeout(() => {
          location.reload();
        }, 3000);
        break;
      default:
        response = `Unknown command: ${command}`;
    }

    const line = document.createElement("div");
    line.textContent = `> ${command}\n${response}`;
    terminalOutput.appendChild(line);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }
});
