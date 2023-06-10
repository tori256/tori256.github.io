const maze = document.querySelector('#maze');
const cursor = document.querySelector('#cursor');
const goal = document.querySelector('#goal');
const result = document.querySelector('#result');
const display = document.querySelector('.display');
const lists = document.querySelectorAll('.runking li');
const startBotton = document.querySelector('.startBotton');
const resetBotton = document.querySelector('.resetBotton');


let isGameStarted = false;
let isGameNotYet = true;
let time;
let timerID;

function displayTime(){
  let dmsecond = time % 100;
  let second = Math.floor(time / 100) % 60;
  let minuite = Math.floor(time / 6000);
  if(dmsecond / 10 < 1)dmsecond = "0" + dmsecond;
  if(second / 10 < 1)second = "0" + second;
  if(minuite / 10 < 1)minuite = "0" + minuite;
  display.textContent = `${minuite}'${second}"${dmsecond}`;
}

resetBotton.addEventListener('click',()=>{
  isGameNotYet = true;
  cursor.style.top = '70px';
  cursor.style.left = '70px';
  result.textContent = '赤い四角をクリックしてスタート';
  time = 0;
  displayTime();
});

startBotton.addEventListener('click',()=>{
  if(isGameNotYet){
    result.textContent = '';
    time = 0;
    displayTime();
    timerID = setInterval(()=>{
      time ++;
      displayTime();
    },10);
    isGameStarted = true;
    isGameNotYet = false;
  }
  maze.addEventListener('mousemove',moveCursor);
  maze.addEventListener('mousemove',()=>{
    checkCollision(goal,'ゴール');
    const obsts = document.querySelectorAll('.obst');
    for(const obst of obsts){
      checkCollision(obst,'失敗');
    }
  });
});

function moveCursor(event) {
  if (isGameStarted) {
    var x = event.clientX - maze.getBoundingClientRect().left;
    var y = event.clientY - maze.getBoundingClientRect().top;
    x = Math.max(0, Math.min(x, maze.offsetWidth - cursor.offsetWidth));
    y = Math.max(0, Math.min(y, maze.offsetHeight - cursor.offsetHeight));
    cursor.style.left = x - 20 + 'px';
    cursor.style.top = y - 20 + 'px';
  }
}

function checkCollision(obj,text){
  const cursorRect = cursor.getBoundingClientRect();
  const objRect = obj.getBoundingClientRect();
  if(
    cursorRect.left >= objRect.left - 40 &&
    cursorRect.right <= objRect.right + 40 &&
    cursorRect.top >= objRect.top - 40 &&
    cursorRect.bottom <= objRect.bottom + 40
  ) {
    result.textContent = text;
    stopGame();
  }
}

function stopGame() {
  if(isGameStarted){
    clearInterval(timerID);
    displayTime();
    isGameStarted = false;
    for(const list of lists){
      if(list.textContent == "" && result.textContent == 'ゴール'){
        list.textContent = display.textContent;
        break;
      }
    }
  }
}

