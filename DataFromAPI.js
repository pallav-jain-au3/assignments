let questionsAndAnswers = {}
$.ajax({
  url: 'https://raw.githubusercontent.com/attainu-nightingale/nightingale-course-module/master/assignments/data/quiz.json',
  dataType: 'json',
  type: 'get',
  success: function (data) {
    data = shuffle(data);
    questionsAndAnswers.questions = data.map(item => item.question)
    questionsAndAnswers.answers = data.map(item => item.answer)
    $('#startButton').on('click', function () {
      startGame();
    })

  },
  fail: function () {
    console.log("Data not recieved");
  }
});

function shuffle(array) {
  return array.sort(() => 0.5 - Math.random())
}
