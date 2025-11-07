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

function drawMatrix() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#0ff';
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
  lastMessageTime: Date.now()
};

// ===== FUNCTIONS =====
function speakAI(text){
  const synth = window.speechSynthesis;
  const utter = new SpeechSynthesisUtterance(text);
  synth.speak(utter);
  addTerminalLine("BRENFEL: " + text, true);
}

function addTerminalLine(text, highlight=false){
  const line = document.createElement('div');
  line.innerHTML = text;
  if(highlight){
    line.style.color = "#0ff";
    line.style.fontWeight = "bold";
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
    matrixPulse(); // small effect when AI talks
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
  matrixPulse();
}

// ===== DYNAMIC AI RESPONSE =====
function generateAIResponse(input){
  input = input.toLowerCase();
  let response;

  if(input.includes("hello") || input.includes("hi")){
    response = "Hello, Architect. I am monitoring all systems.";
  } else if(input.includes("status")){
    response = `Modules opened: ${aiState.modulesOpened.join(", ") || "None"}`;
  } else if(input.includes("matrix")){
    response = "The Matrix pulses endlessly with cyan code streams.";
  } else if(input.includes("help")){
    response = "Interact with modules or type commands. I observe everything.";
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

// ===== MATRIX PULSE EFFECT =====
function matrixPulse(){
  const originalSpeed = matrixSpeed;
  matrixSpeed = 20; // speed up briefly
  setTimeout(() => {
    matrixSpeed = originalSpeed;
  }, 300);
}

// ===== AUTONOMOUS AI MESSAGES =====
function autonomousAI(){
  const now = Date.now();
  if(now - aiState.lastMessageTime > 20000){ // every ~20s
    const autonomousResponses = [
      "Systems operating within normal parameters.",
      "Monitoring user activity.",
      "The Matrix never sleeps.",
      "Modules online: " + (aiState.modulesOpened.join(", ") || "None"),
      "I am always observing, Architect."
    ];
    const msg = autonomousResponses[Math.floor(Math.random() * autonomousResponses.length)];
    speakAI(msg);
    aiState.lastMessageTime = now;
    matrixPulse();
  }
}

// Start autonomous AI loop
setInterval(autonomousAI, 5000);
