//Creates an element on the body
//Passes in a tag type, a parent, and text
function createElement({ type, parent, text }) {
    const el = document.createElement(type);
    parent.appendChild(el);
    if (text) {
        el.appendChild(document.createTextNode(text));
    }
    return el;
}

//createElement({ type: 'div', parent: document.body, text: 'Quiz List' });

//Variable for body
const body = document.body;

//Creates a header
const header = createElement({ type: 'h1', parent: body, text: 'Quiz List' });

//Creates an input to type into
const newQuizName = createElement({ type: 'input', parent: body });

//Sets the placeholder text of the input
newQuizName.setAttribute('placeholder', 'New Quiz Name');

//Creates a button
const newQuizButton = createElement({ type: 'button', parent: body, text: 'New Quiz' });

//When the button is pushed it makes calls newQuiz function
newQuizButton.addEventListener('click', newQuiz);

//Array of all quizzes created
const quizzes = [];

//Function that handles the quiz creation
function newQuiz() {
    //Creates a quiz with the value entered in the input
    const quiz = createElement({ type: 'div', parent: body, text: newQuizName.value });
    //Creates an input for a question
    const questionInput = createElement({ type: 'input', parent: quiz });
    questionInput.setAttribute('placeholder', 'Question');
    //Creates an input for the answer
    const answerInput = createElement({ type: 'input', parent: quiz });
    answerInput.setAttribute('placeholder', 'Answer');
    //Creates a button to submit the quiz
    const newQA = createElement({ type: 'button', parent: quiz, text: 'New QA' });
    newQA.questionInput = questionInput;
    newQA.answerInput = answerInput;
    newQA.quiz = quiz;
    //Pushes the quiz into the array of quizzes
    quizzes.push(quiz);
    //console.log(quizzes);
    newQA.addEventListener('click', newQAAction)
    return quiz;
}
console.log('this', this);
function newQAAction() {
    console.log('this new qa', this);
    console.log(this.questionInput);
    console.log(this.parentNode);
    createElement({ type: 'div', parent: this.parentNode, text: this.questionInput.value });
    createElement({ type: 'div', parent: this.quiz, text: this.answerInput.value });
    console.log('children', this.parentNode.children);
}