let player;
let seconds;
let pointer = 0;
function startGame() {
  removeStartMenu();
  displayGameOn();
  displayQuestion();
  player = new Player()
  seconds = 60;
  startTimer();
  addEventListeners();
}


function removeStartMenu() {
  $('#start-game').css('display', 'none');
}


function displayGameOn() {
  $('#gameOn').css('display', 'block');
}


function displayQuestion() {
  let question = questionsAndAnswers.questions[pointer];
  $('h3').html(`Q${pointer + 1}) ${question}`);
}


function startTimer() {
  if (seconds == 0) {
    stopTimer();
    gameOver();
    return
  }
  else if (seconds <= 5) {
    changeTimeColor("red");
  }
  else if (seconds <= 10) {
    changeTimeColor("green");
  }
  seconds = seconds - 1;
  window.timer = setTimeout(startTimer, 1000);
  $('.timer span').text(`00: ${pad(seconds, 2)}`)
}


function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}


function stopTimer() {
  clearTimeout(window.timer);
}


function changeTimeColor(color) {
  $('.timer span').css('color', color);
}


function addEventListeners() {
  
  $('input').on('keypress', function (e) {
    if (e.keyCode === 13) {
      storeAnswer();
      incrementPointer();
      displayQuestion();
      displayStoredAnswerOfPlayer();
    }
  });

  $('#next').on('click', function () {
    storeAnswer();
    incrementPointer();
    displayQuestion();
    displayStoredAnswerOfPlayer();
  });
  $('#previous').on('click', function () {
    storeAnswer();
    decreamentPointer()
    displayQuestion();
    displayStoredAnswerOfPlayer();

  });

  $('#submit').on('click', function () {
    stopTimer();
    storeAnswer();
    getResults();
  })
}


function storeAnswer() {
  player.answers[pointer] = $('#answer').val();
}


function resetGame() {
  stopTimer();
  changeTimeColor("black");
  removeGameOver();
  clearInput();
  startGame();
}


function removeGameOver(){
  $('.gameOver').css("display", "none");
}


function clearInput(){
  $('#answer').val('');
}


function incrementPointer() {
  if (pointer < questionsAndAnswers.questions.length - 1) {
    pointer++;
  }
}


function decreamentPointer() {
  if (pointer > 0) {
    --pointer;
  }
}

function displayStoredAnswerOfPlayer() {
  $('#answer').val(player.answers[pointer]);
}


function removeEventListener() {
  $('#submit').off('click');
  $('input').off('keypress');
  $('#next').off('click');
  $('#previous').off('click')
}


function gameOver() {
  removeEventListener();
  getResults();
}



function getResults() {
  let result = matchAnswers();
  displayResult(result);
}


function displayResult([correctAnswers, wrongAnswers]) {
  endGame();
  addResult();
  $('.gameOver h5 .total').text(questionsAndAnswers.questions.length)
  $('.gameOver h5 .right').text(correctAnswers);
  $('.gameOver h5 .wrong').text(wrongAnswers);
  $('.gameOver h5 .time').text(`${pad(60 - seconds, 2)} seconds`);
}


function endGame() {
  $('#gameOn').css('display', 'none');
}


function addResult() {
  $('.gameOver').css('display', 'block');
}


function matchAnswers() {
  let correctAnswers = 0;
  let wrongAnswers = 0;
  for (let index in player.answers) {
    let playerAnswer = player.answers[index].toLowerCase();
    let expectedAnswer = questionsAndAnswers.answers[index].toLowerCase();

    if (playerAnswer === expectedAnswer) {
      correctAnswers++;
    }
    else {
      wrongAnswers++;
    }

  }
  return [correctAnswers, wrongAnswers];
}



