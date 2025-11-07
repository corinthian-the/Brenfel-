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

let matrixSpeed = 50;
let matrixColor = '#0ff';

function drawMatrix() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = matrixColor;
  ctx.font = fontSize + 'px monospace';
  for(let i = 0; i < drops.length; i++) {
    const text = letters.charAt(Math.floor(Math.random() * letters.length));
    ctx.fillText(text, i * fontSize, drops[i]);
    drops[i] += fontSize;
    if(drops[i] > canvas.height && Math.random() > 0.975) drops[i] = 0;
  }
}
setInterval(drawMatrix, matrixSpeed);

// ===== AI LOGIC =====
const mainConsole = document.getElementById('main-console');
const terminal = document.getElementById('terminal');
const enterBtn = document.getElementById('enter-btn');
const soundBtn = document.getElementById('sound-btn');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const moduleBtns = document.querySelectorAll('.module-btn');

let aiState = {
  modulesOpened: [],
  history: [],
  lastMessageTime: Date.now(),
  mood: "neutral"
};

// ===== FUNCTIONS =====
function speakAI(text){
  const synth = window.speechSynthesis;
  const utter = new SpeechSynthesisUtterance(text);
  synth.speak(utter);
  addTerminalLine("BRENFEL: " + text, true);
  matrixGlowPulse();
  setMatrixColorByMood();
}

function addTerminalLine(text, highlight=false){
  const line = document.createElement('div');
  line.innerHTML = text;
  if(highlight){
    line.style.fontWeight = "bold";
    line.classList.add("flicker");
    setTimeout(() => line.classList.remove("flicker"), 400);
  }
  terminal.appendChild(line);
  terminal.scrollTop = terminal.scrollHeight;
}

// ===== ENTER BUTTON =====
enterBtn.addEventListener('click', () => {
  mainConsole.classList.remove('hidden');
  speakAI("SYSTEM ONLINE. Welcome, Architect.");
});

// ===== SOUND BUTTON =====
soundBtn.addEventListener('click', () => {
  speakAI("I am Brenfel. Ready to assist.");
});

// ===== MODULE BUTTONS =====
moduleBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const moduleName = btn.dataset.module;
    if(!aiState.modulesOpened.includes(moduleName)){
      aiState.modulesOpened.push(moduleName);
    }
    speakAI(`Accessing module: ${moduleName}`);
  });
});

// ===== USER INPUT =====
sendBtn.addEventListener('click', handleUserInput);
userInput.addEventListener('keypress', (e) => {
  if(e.key === 'Enter') handleUserInput();
});

function handleUserInput(){
  const input = userInput.value.trim();
  if(input === "") return;
  addTerminalLine("USER: " + input);
  aiState.history.push(input);
  userInput.value = "";
  generateAIResponse(input);
}

// ===== DYNAMIC AI RESPONSE WITH MOOD =====
function generateAIResponse(input){
  input = input.toLowerCase();
  let response;

  if(input.includes("hello") || input.includes("hi")){
    response = "Hello, Architect. I am monitoring all systems.";
    aiState.mood = "friendly";
  } else if(input.includes("status")){
    response = `Modules opened: ${aiState.modulesOpened.join(", ") || "None"}`;
    aiState.mood = "neutral";
  } else if(input.includes("matrix")){
    response = "The Matrix pulses endlessly with cyan code streams.";
    aiState.mood = "analytical";
  } else if(input.includes("help")){
    response = "Interact with modules or type commands. I observe everything.";
    aiState.mood = "helpful";
  } else if(input.includes("time")){
    response = "Current system time is " + new Date().toLocaleTimeString();
  } else {
    const genericResponses = [
      "Processing your input...",
      "Interesting, tell me more.",
      "Analyzing data streams...",
      "I am observing the Matrix patterns.",
      "Fascinating. Continue."
    ];
    response = genericResponses[Math.floor(Math.random() * genericResponses.length)];
  }

  speakAI(response);
}

// ===== MATRIX GLOW PULSE =====
function matrixGlowPulse(){
  canvas.style.animation = "glowPulse 0.3s ease-in-out";
  setTimeout(() => { canvas.style.animation = ""; }, 300);
}

// ===== MATRIX COLOR BY MOOD =====
function setMatrixColorByMood(){
  switch(aiState.mood){
    case "friendly": matrixColor = "#0ff"; break;
    case "helpful": matrixColor = "#0fa"; break;
    case "analytical": matrixColor = "#aaf"; break;
    default: matrixColor = "#0ff"; break;
  }
}

// ===== AUTONOMOUS AI MESSAGES =====
function autonomousAI(){
  const now = Date.now();
  if(now - aiState.lastMessageTime > 20000){ // every 20s
    let msg;
    if(aiState.modulesOpened.length > 0 && Math.random() < 0.5){
      msg = `You opened modules: ${aiState.modulesOpened.join(", ")}. Shall I check their status?`;
    } else if(Math.random() < 0.5){
      msg = "The Matrix continues its eternal flow.";
    } else {
      msg = "I am observing your activity, Architect.";
    }
    speakAI(msg);
    aiState.lastMessageTime = now;
  }
}
setInterval(autonomousAI, 5000);

