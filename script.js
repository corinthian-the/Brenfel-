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

function drawMatrix() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#0ff'; // cyan
  ctx.font = fontSize + 'px monospace';
  for(let i = 0; i < drops.length; i++) {
    const text = letters.charAt(Math.floor(Math.random() * letters.length));
    ctx.fillText(text, i * fontSize, drops[i]);
    drops[i] += fontSize;
    if(drops[i] > canvas.height && Math.random() > 0.975) drops[i] = 0;
  }
}
setInterval(drawMatrix, 50);

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
  history: []
};

// Speak function
function speakAI(text){
  const synth = window.speechSynthesis;
  const utter = new SpeechSynthesisUtterance(text);
  synth.speak(utter);
  addTerminalLine("BRENFEL: " + text);
}

// Add line to terminal
function addTerminalLine(text){
  terminal.innerHTML += text + "<br>";
  terminal.scrollTop = terminal.scrollHeight;
}

// ENTER button shows main console
enterBtn.addEventListener('click', () => {
  mainConsole.classList.remove('hidden');
  speakAI("SYSTEM ONLINE. Welcome, Architect.");
});

// SOUND BUTTON
soundBtn.addEventListener('click', () => {
  speakAI("I am Brenfel. Ready to assist.");
});

// MODULE BUTTONS
moduleBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const moduleName = btn.dataset.module;
    aiState.modulesOpened.push(moduleName);
    speakAI(`Accessing module: ${moduleName}`);
  });
});

// SEND USER INPUT
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

// DYNAMIC AI RESPONSE
function generateAIResponse(input){
  input = input.toLowerCase();

  let response = "I am not sure how to respond to that.";

  if(input.includes("hello") || input.includes("hi")){
    response = "Hello, Architect. How are you today?";
  } else if(input.includes("status")){
    response = `Modules opened so far: ${aiState.modulesOpened.join(", ") || "None"}`;
  } else if(input.includes("matrix")){
    response = "The Matrix pulses endlessly with cyan code streams.";
  } else if(input.includes("help")){
    response = "You can interact with modules, type commands, or ask me about the system.";
  } else if(input.includes("time")){
    response = "It is currently " + new Date().toLocaleTimeString();
  } else {
    // Random generic dynamic response
    const genericResponses = [
      "Interesting... tell me more.",
      "Fascinating. Continue.",
      "I am analyzing your request.",
      "Processing your input...",
      "That is something I can explore."
    ];
    response = genericResponses[Math.floor(Math.random() * genericResponses.length)];
  }

  speakAI(response);
}
