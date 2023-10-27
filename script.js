let timerInterval;
let isRunning = false;
let timeRemaining = 25 * 60; // 25 minutes in seconds

const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');

function updateTimerDisplay() {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const timeText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  timerDisplay.innerText = timeText;
  document.title = "Timer: " + timeText;
}
//pad start so it reads 02:03 and not 2:3 even tho that's what it would actually be

function startTimer() {
  if (!isRunning) {
    timerInterval = setInterval(function() { //anonymous function
      if (timeRemaining > 0) {
        timeRemaining--;
        updateTimerDisplay();
      } else {
        clearInterval(timerInterval);
        isRunning = false;
        playSound();
      }
    }, 1000); //in milliseconds
    isRunning = true;
  }
}

function pauseTimer() {
  if (isRunning) {
    clearInterval(timerInterval);
    isRunning = false;
  }
}

function resetTimer() {
  clearInterval(timerInterval);
  isRunning = false;
  timeRemaining = 25 * 60;
  updateTimerDisplay();
}

function playSound () {
  let alarm = new Audio('alarm.mp3');
  alarm.play();
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);