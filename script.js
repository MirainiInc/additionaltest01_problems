const startBtn = document.querySelector('.start-btn');
const popupInfo = document.querySelector('.popup-info');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const continueBtn = document.querySelector('.continue-btn');
const quizSection = document.querySelector('.quiz-section');
const quizBox = document.querySelector('.quiz-box');
const resultBox = document.querySelector('.result-box');
const tryAgainBtn = document.querySelector('.tryAgain-btn');
const goHomeBtn = document.querySelector('.goHome-btn');
const nextBtn = document.querySelector('.next-btn');

let questionCount = 0;
let userScore = 0;

startBtn.addEventListener('click', () => {
  popupInfo.classList.add('active');
  main.classList.add('active');
})

exitBtn.addEventListener('click', () => {
})

continueBtn.addEventListener('click', () => {
  quizSection.classList.add('active');
  popupInfo.classList.remove('active');
  main.classList.remove('active');
  quizBox.classList.add('active');

  showQuestions(0);
  headerScore();
})

tryAgainBtn.addEventListener('click', () => {
  quizBox.classList.add('active');
  nextBtn.classList.remove('active');
  resultBox.classList.remove('active');

  headerScore();
})

goHomeBtn.addEventListener('click', () => {
  quizSection.classList.remove('active');
  nextBtn.classList.remove('active');
  resultBox.classList.remove('active');

  questionCount = 0;
  userScore = 0;
  showQuestions(questionCount);
})

nextBtn.addEventListener('click', () => {
  if (questionCount < questions.length) {
    questionCount++;
    showQuestions(questionCount);

    nextBtn.classList.remove('active');
  } else {
    showResultBox();
  }
})

const optionList = document.querySelector('.option-list');

// getting questions and options from array
function showQuestions(index) {
  questionCounter(index)

  const questionText = document.querySelector('.question-text');
  questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;

  const optionTag = `<div class="option"><span>${questions[index].options[0]}</span></div>
        <div class="option"><span>${questions[index].options[1]}</span></div>
        <div class="option"><span>${questions[index].options[2]}</span></div>
        <div class="option"><span>${questions[index].options[3]}</span></div>`;

  optionList.innerHTML = optionTag;

  const options = document.querySelectorAll('.option');
  for (const option of options) {
    option.addEventListener('click', function () {
      optionSelected(this);
    })
  }
}

function optionSelected(answer) {
  const userAnswer = answer.textContent;
  const correctAnswer = questions[questionCount].answer;
  const allOptions = optionList.children;

  userScore += 1;

  if (userAnswer === correctAnswer) {
    answer.classList.add('correct');
    headerScore();
  } else {
    answer.classList.add('incorrect');

    // if answer incorrect, auto selected correct answer
    for (const option of allOptions) {
      if (option.textContent === correctAnswer) {
        option.classList.add('correct');
      }
    }
  }

  // if user has selected, disabled all options
  for (const option of allOptions) {
    option.classList.add('disabled');
  }

  nextBtn.classList.add('active');
}

function questionCounter(index) {
  const questionTotal = document.querySelector('.question-total');
  questionTotal.textContent = `第${index + 1}問`;
}

function headerScore() {
  const headerScoreText = document.querySelector('.header-score');
  headerScoreText.textContent = `点数: ${userScore} / ${questions.length}`;
}

function showResultBox() {
  quizBox.classList.remove('active');
  resultBox.classList.add('active');

  const scoreText = document.querySelector('.score-text');
  scoreText.textContent = `${questions.length} 問中 ${userScore} 問正解！`;

  const circularProgress = document.querySelector('.circular-progress');
  const progressValue = document.querySelector('.progress-value');
  let progressStartValue = -1;
  const progressEndValue = (userScore / questions.length) * 100;
  const speed = 20;

  const progress = setInterval(() => {
    progressStartValue++;

    progressValue.textContent = `${progressStartValue}%`;
    circularProgress.style.background = `conic-gradient(#c40094 ${progressStartValue * 3.6}deg, rgba(255, 255, 255, .1) 0deg)`;

    if (progressStartValue === progressEndValue) {
      clearInterval(progress);
    }
  }, speed);
}