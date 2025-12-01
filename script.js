const STUDY_SECONDS = 25 * 60;
const BREAK_SECONDS = 5 * 60;

const display = document.getElementById('time-display');
const startPauseBtn = document.getElementById('start-pause');
const resetBtn = document.getElementById('reset');
const modeLabel = document.getElementById('mode-label');

let intervalId = null;
let remaining = STUDY_SECONDS;
let isRunning = false;
let isStudy = true;

function formatTime(seconds) {
  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');
  return `${mm}:${ss}`;
}

function updateDisplay() {
  display.textContent = formatTime(remaining);
}

function switchToStudy() {
  isStudy = true;
  remaining = STUDY_SECONDS;
  modeLabel.textContent = 'Estudo';
  updateDisplay();
}

function switchToBreak(extra = 0) {
  isStudy = false;
  remaining = BREAK_SECONDS + extra;
  modeLabel.textContent = 'Pausa';
  updateDisplay();
}

function tick() {
  if (remaining <= 0) {
    clearInterval(intervalId);
    isRunning = false;

    if (isStudy) {
      alert("Tempo de estudo acabou! Agora é hora de descansar.");
      switchToBreak();
      startTimer();
    } else {
      const opcao = confirm("Pausa acabou! Quer começar a estudar agora?\nCancelar = descansar mais um pouco");
      if (opcao) {
        switchToStudy();
        startTimer();
      } else {
        const extraMinutes = 5 * 60;
        switchToBreak(extraMinutes);
        startTimer();
      }
    }

    return;
  }

  remaining--;
  updateDisplay();
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;
  startPauseBtn.textContent = 'Pausar';
  intervalId = setInterval(tick, 1000);
}

function pauseTimer() {
  isRunning = false;
  startPauseBtn.textContent = 'Iniciar';
  clearInterval(intervalId);
}

function resetTimer() {
  pauseTimer();
  switchToStudy();
}

startPauseBtn.addEventListener('click', () => {
  if (isRunning) pauseTimer();
  else startTimer();
});

resetBtn.addEventListener('click', resetTimer);

updateDisplay();