var timeRemaining = document.querySelector("#countdown");
var startQuizButton = document.querySelector("#start-button");
var homePgText = document.querySelector("#homePgText");
var questionTitle = document.querySelector("#question-title");
var buttonA = document.querySelector("#answer-button-a");
var buttonB = document.querySelector("#answer-button-b");
var buttonC = document.querySelector("#answer-button-c");
var buttonD = document.querySelector("#answer-button-d");
var endPgText = document.querySelector("#endPgText");
var userScore = document.querySelector("#user-score");
var initialsInput = document.querySelector("#initialsInput");
var saveScoreButton = document.querySelector("#saveScoreButton");
var highScorePg = document.querySelector("#highScorePg")

// Array of all quiz questions, including question, answer options, and correct answer
var quizQuestions = [
  {
    question:
      "What HTML tag do you put things in if you want them to appear on the page?",
    answers: {
      a: "<html>",
      b: "<head>",
      c: "<body>",
      d: "<p>",
    },
    correctAnswer: "c",
  },
  {
    question: "Inside which HTML element do we put the JavaScript?",
    answers: {
      a: "<head>",
      b: "<javascript>",
      c: "<js>",
      d: "<script>",
    },
    correctAnswer: "d",
  },
  {
    question: "What HTML tag makes a link?",
    answers: {
      a: "<a>",
      b: "<tr>",
      c: "<img />",
      d: "<br />",
    },
    correctAnswer: "a",
  },
  {
    question: "How do you create a function in JavaScript?",
    answers: {
      a: "function:myFunction()",
      b: "function myFunction()",
      c: "function = myFunction()",
      d: "None of these",
    },
    correctAnswer: "c",
  },
  {
    question: "What CSS property makes the color of the page change?",
    answers: {
      a: "font-color",
      b: "background-color",
      c: "full-color",
      d: "color",
    },
    correctAnswer: "b",
  },
  {
    question: "How do you call a function named myFunction?",
    answers: {
      a: "myFunction()",
      b: "call myFunction()",
      c: "call function myFunction()",
      d: "My Function ()",
    },
    correctAnswer: "a",
  },
  {
    question:
      "Where in an HTML document is the correct place to refer to an external style sheet?",
    answers: {
      a: "In the <body> tag",
      b: "In the <head> tag",
      c: "At the very end",
      d: "The first line",
    },
    correctAnswer: "b",
  },
];

// When the start quiz button is clicked, the countdown begins and questions are displayed
startQuizButton.addEventListener("click", function () {
  countdown();
  startQuiz();
});

// Declared globally as it is used in multiple functions
var timeLeft = 70;
var timeInterval;
// This function sets the time interval to seconds, timer starts at 75 seconds and displays text content to the screen. Time decreases by 1 each second.
var countdown = function () {
  timeInterval = setInterval(function () {
    if (timeLeft === 0) {
      completeQuiz();
    }
    if (timeLeft > 0) {
      timeRemaining.textContent = "Time Remaining: " + timeLeft;
      timeLeft--;
    } else {
      // When the timer is at 0, a times up note appears
      timeRemaining.textContent = "Time's up!";
      clearInterval(timeInterval);
    }
  }, 1000);
};

// Hides the home page text and start quiz buttons when start quiz is clicked.
var startQuiz = function () {
  startQuizButton.style.display = "none";
  homePgText.style.display = "none";
  showQuizQuestions();
};

var currentQuestion = 0;

// If any answer button is clicked, the listeners will check if it was the correct answer, and the next question will show
buttonA.addEventListener("click", function () {
  checkForCorrectAns("a");
  currentQuestion++;
  showQuizQuestions();
});
buttonB.addEventListener("click", function () {
  checkForCorrectAns("b");
  currentQuestion++;
  showQuizQuestions();
});
buttonC.addEventListener("click", function () {
  checkForCorrectAns("c");
  currentQuestion++;
  showQuizQuestions();
});
buttonD.addEventListener("click", function () {
  checkForCorrectAns("d");
  currentQuestion++;
  showQuizQuestions();
});

var showQuizQuestions = function () {
  // First checks if all questions have been answered and if so, hides all question elements
  if (currentQuestion >= quizQuestions.length) {
    completeQuiz();
    return;
  }

  // Displays full question, along with answers.
  var individualQuestion = quizQuestions[currentQuestion];
  questionTitle.textContent = individualQuestion.question;
  buttonA.textContent = individualQuestion.answers.a;
  buttonB.textContent = individualQuestion.answers.b;
  buttonC.textContent = individualQuestion.answers.c;
  buttonD.textContent = individualQuestion.answers.d;
  buttonA.style.display = "block";
  buttonB.style.display = "block";
  buttonC.style.display = "block";
  buttonD.style.display = "block";
};

// This function checks if the selected answer was correct, if not, 5 seconds are deducted from the time remaining
var checkForCorrectAns = function (selectedAnswer) {
  var correctAnswer = quizQuestions[currentQuestion].correctAnswer;
  if (selectedAnswer !== correctAnswer) {
    timeLeft -= 5;
  }
};

// Determines user final score by the time remaining
var finalScore = function () {
  userScore.textContent = "Your final score is: " + timeLeft;
};

var completeQuiz = function () {
  // Stops and hides timer
  clearInterval(timeInterval);
  timeRemaining.style.display = "none";
  // Hides all question elements
  questionTitle.style.display = "none";
  buttonA.style.display = "none";
  buttonB.style.display = "none";
  buttonC.style.display = "none";
  buttonD.style.display = "none";
  // Display end quiz page and call final score to display
  endPgText.style.display = "block";
  finalScore();
};

var leaderBoardPg = function () {
    highScorePg.style.display = "block";
}

  saveScoreButton.addEventListener("click", function () {
    var initials = initialsInput.value;

    if (initials) {
      localStorage.setItem("userInitials", initials);
      leaderBoardPg();
    } else {
      alert("Please enter your initials.");
    }

  });
