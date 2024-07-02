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


document.getElementById('newTask').addEventListener('click', function () {
  let taskName = prompt('New task name: ');
  if (taskName) {
    let taskElement = document.createElement('div');
    taskElement.textContent = taskName;
    taskElement.className = 'task-item';
    taskElement.setAttribute("draggable", "true");
    document.getElementById('taskList').appendChild(taskElement);
    taskElement.addEventListener('dragstart', handleDragStart, false);
    taskElement.addEventListener('dragenter', handleDragEnter, false);
    taskElement.addEventListener('dragover', handleDragOver, false);
    taskElement.addEventListener('dragleave', handleDragLeave, false);
    taskElement.addEventListener('drop', handleDrop, false);
    taskElement.addEventListener('dragend', handleDragEnd, false);
    }
  
  /*let items = document.querySelectorAll('.task-item');
  for (var index = 0; index < items.length; index++) {
    console.log(items[index]);
    
  } */
  
  
} );


// DRAGGING AND DROPPING


var dragSrcEl = null;

function handleDragStart(e) {
  this.style.opacity = '0.4';
  
  dragSrcEl = this;

  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }

  e.dataTransfer.dropEffect = 'move';
  
  return false;
}

function handleDragEnter(e) {
  this.classList.add('over');
}

function handleDragLeave(e) {
  this.classList.remove('over');
}

function handleDrop(e) {
  if (e.stopPropagation) {
    e.stopPropagation(); // stops the browser from redirecting.
  }
  
  if (dragSrcEl != this) {
    dragSrcEl.innerHTML = this.innerHTML;
    this.innerHTML = e.dataTransfer.getData('text/html');
  }
  
  return false;
}

function handleDragEnd(e) {
  this.style.opacity = '1';
  let items = document.querySelectorAll('.task-item');
  items.forEach(function (item) {
    item.classList.remove('over');
  });
}

/*
let items = document.querySelectorAll('.task-item');
for (var index = 0; index < items.length; index++) {
  console.log(items[index]);
  
}
items.forEach(function(item) {
  item.addEventListener('dragstart', handleDragStart, false);
  item.addEventListener('dragenter', handleDragEnter, false);
  item.addEventListener('dragover', handleDragOver, false);
  item.addEventListener('dragleave', handleDragLeave, false);
  item.addEventListener('drop', handleDrop, false);
  item.addEventListener('dragend', handleDragEnd, false);
});
*/

