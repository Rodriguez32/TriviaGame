

// Did not get Start button to start the game. When I click it seems to respond though
$('#startBtn').on('click', function(){
	$(this).hide();
	buildQuiz();
});

var timeLeft = 30;
var elem = document.getElementById('timer');

var timerId = setInterval(countdown, 1000);

function countdown() {
  if (timeLeft == 0) {
    clearTimeout(timerId);
    doSomething();
  } else {
    elem.innerHTML = timeLeft + ' seconds remaining';
    timeLeft--;
  }
}

function buildQuiz(){
    // this will store the HTML output
    var output = [];

    // for each question
myQuestions.forEach(
    (currentQuestion, questionNumber) => {
    //this will store the list of answer choices
    var answers = [];

    //for each available answer
    for (letter in currentQuestion.answers){
        //add an HTML radio button
        answers.push(
           `<label> 
                <input type="radio" name="question${questionNumber}" value="${letter}">
                ${letter} : 
                ${currentQuestion.answers[letter]}
            </label>`       
        
    );
    }

// add this question and its answers to the output
output.push(
    `<div class="question"> ${currentQuestion.question} </div>
    <div class="answers"> ${answers.join('')} </div>`
        );
    }
);    
    
// and finally combine output list into one string of html and put it on the page
quizContainer.innerHTML = output.join('');

}



function showResults(){
// gather answer containers from quiz
    var answerContainers = quizContainer.querySelectorAll(".answers");
// keep track of user's answers
    let numCorrect = 0;
    let numIncorrect = 0;

    myQuestions.forEach(
        (currentQuestion, questionNumber) => {
            // find selected answer
            const answerContainer = answerContainers[questionNumber];
            const selector = 'input[name=question' + questionNumber+']:checked';
            const userAnswer = (answerContainer.querySelector(selector) || {}).value;

            //if answer is correct(THIS WORKS)
            if(userAnswer===currentQuestion.correctAnswer){
                // add to the number of correct 
                numCorrect++;
            }
            // if answer is wrong add to number of incorrect(THIS DOES NOT WORK)
            else{
                
                numIncorrect++;
            }

        }
    );

// show number of correct and incorrect answers out of total
resultsContainer.innerHTML = numCorrect + ' out of ' + myQuestions.length;

}

const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');

var myQuestions = [
    {
        question: "Where were the first Ancient Olympics staged?",
        
        answers: {
            a: "Olympia",
            b: "Athens",
            c: "Corinth",
            d: "Miletus",
        },
        correctAnswer: "a"
    },

    {
        question: "Games were dedicated to the Olympian God Zeus. Which one of these was his wife?",

        answers: {
            a: "Athena",
            b: "Demeter",
            c: "Hera",
            d: "Aphrodite",
        },
        correctAnswer: "c"
    },

    {
        question: "The Fesitval in Honor of Hera only allowed what women to play?",

        answers: {
            a: "Married women",
            b: "Women who had children",
            c: "Unmarried women",
        },
        correctAnswer: "c"
    },

    {
        question: "What year where the women first allowed to play in Modern Olympic Games?",

        answers: {
            a: "776 BC",
            b: "1894",
            c: "394 AD",
            d: "1900",
        },
        correctAnswer: "d"
    },

    {
        question: "In the year 1900 which two sports were the only ones women were allowed to play individually?",

        answers: {
            a: "Wrestling & Boxing",
            b: "Golf & Tennis ",
            c: "Jumping & Gymnastics",
            d: "Swimming & Croquet",
        },
        correctAnswer: "b"
    },

];


// will display quiz
buildQuiz();

// when clicked it will show results
submitButton.addEventListener('click', showResults);