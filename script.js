document.addEventListener('DOMContentLoaded', function() {
  const maze = document.querySelector('#maze');
  const cursor = document.querySelector('#cursor');
  const goal = document.querySelector('#goal');
  const result = document.querySelector('#result');
  const display = document.querySelector('.display');
  const lists = document.querySelectorAll('.runking li');
  
  let isGameStarted = false;
  let isGameNotYet = true;
  let timerID;
  let time;
  let dmsecond;
  let second;
  let minuite
  
  // ゲームスタート時の処理
  const startBotton = document.querySelector('.startBotton');
  const resetBotton = document.querySelector('.resetBotton');
  startBotton.addEventListener('click',startGame)
  resetBotton.addEventListener('click',resetGame)

  function countTime(){
    time ++;
    displayTime();
  }

  function displayTime(){
    dmsecond = time % 100;
    second = ((time - (time % 100)) / 100) % 60;
    minuite = (time - (time % 6000)) / 60;
    if((dmsecond - (dmsecond % 10)) === 0)dmsecond = "0" + dmsecond;
    if((second - (second % 10)) === 0)second = "0" + second;
    if((minuite - (minuite % 10)) === 0)minuite = "0" + minuite;
    display.textContent = `${minuite}'${second}"${dmsecond}`;
  }

  function resetGame(){
    isGameNotYet = true;
    cursor.style.top = '70px';
    cursor.style.left = '70px';
    result.textContent = '赤い四角をクリックしてスタート';
    time = 0;
    displayTime();
  }

  function startGame() {
    if(isGameNotYet){
      result.textContent = '';
      time = 0;
      displayTime();
      timerID = setInterval(countTime,10);
      isGameStarted = true;
      isGameNotYet = false;
    }
    // カーソルの移動イベントを追跡
    maze.addEventListener('mousemove', moveCursor);

    // ゴールに到達したかを確認
    maze.addEventListener('mousemove', checkGoal);
  }

  // カーソルの移動処理
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

  // ゴールに到達したかを確認する処理
  function checkGoal() {
    if (isGameStarted) {
      const cursorRect = cursor.getBoundingClientRect();
      const goalRect = goal.getBoundingClientRect();
      if (
        cursorRect.left >= goalRect.left - 40 &&
        cursorRect.right <= goalRect.right + 40 &&
        cursorRect.top >= goalRect.top - 40 &&
        cursorRect.bottom <= goalRect.bottom + 40
      ) {
        result.textContent = 'ゴール';
        stopGame();
      }

      const obsts = document.querySelectorAll('.obst');
      for(const obst of obsts){
        const obsrRect = obst.getBoundingClientRect();
        if(
          cursorRect.left >= obsrRect.left - 40 &&
          cursorRect.right <= obsrRect.right + 40 &&
          cursorRect.top >= obsrRect.top - 40 &&
          cursorRect.bottom <= obsrRect.bottom + 40
        ) {
          result.textContent = '失敗';
          stopGame();
        }
      }
      
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

});
