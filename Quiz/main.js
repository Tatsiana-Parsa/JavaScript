/* ALL ANSWER OPTIONS*/

const option1 = document.querySelector('.option1');
      option2 = document.querySelector('.option2');  
      option3 = document.querySelector('.option3');
      option4 = document.querySelector('.option4');

/* ALL OUR OPTIONS*/

const optionElements = document.querySelectorAll('.option');

const question = document.getElementById('question');  //сам вопрос

const numberOfQuestion = document.getElementById('number-of-question'),  //номер вопроса
      numberOfAllQuestions = document.getElementById('number-of-all-questions');  //количество всех вопросов  

let indexOfQuestion,  // индекс текущего вопроса
    indexOfPage = 0;  // индекс страницы

const answersTracker = document.getElementById('answers-tracker');  //обертка для трекера
const btnNext = document.getElementById('btn-next');  //кнопка далее

let score = 0;  //итоговый результат викторины

const correctAnswer = document.getElementById('correct-answer'),  //количество правильных ответов
      numberOfAllQuestions2 = document.getElementById('number-of-all-questions-2'),  //количество всех вопросов (в модальном окне)
      btnTryAgain = document.getElementById('btn-try-again');  //кнопа "начать викторину заново" 
      
const questions = [
    {
        question: 'Как называется японская национальная традиция любования цветами ?',
        options: [
            'Манами',
            'Нахами',
            'Минаха',
            'Ханами',
        ],
        rightAnswer: 3
    },
    {
        question: 'Какое дерево начинает цветение первым ?',
        options: [
            'умэ',
            'сакура',
            'клен',
            'кусара',
        ],
        rightAnswer: 0
    },
    {
        question: 'Укажите самый большой городской парк Токио:',
        options: [
            'Синдзюку',
            'Сумида',
            'Уэно',
            'Ноэу',
        ],
        rightAnswer: 2
    },
    {
        question: 'Обозначте период цветение сакуры в Японии :',
        options: [
            'начало апреля',
            'с конца февраля до конца мая',
            'с середины апреля до начала июня',
            'весь апрель',
        ],
        rightAnswer: 1
    }
];

numberOfAllQuestions.innerHTML = questions.length;  //выводим кол-во впросов
 
const load = () => {
    question.innerHTML = questions[indexOfQuestion].question;  //сам вопрос

    //мапим ответы

    option1.innerHTML = questions[indexOfQuestion].options[0];
    option2.innerHTML = questions[indexOfQuestion].options[1];
    option3.innerHTML = questions[indexOfQuestion].options[2];
    option4.innerHTML = questions[indexOfQuestion].options[3];

    numberOfQuestion.innerHTML = indexOfPage + 1;  //установка номера текущей страницы
    indexOfPage++;  //увеличение индекса страницы
};

let complitedAnswers = []  //массив для уже заданных вопросов

const randomQuestion = () => {
    let randomNumber = Math.floor(Math.random() * questions.length);
    let hitDuplicate = false;  //якорь для проверки одинаковых вопросов

    if(indexOfPage == questions.length) {
        quizOver()
    } else {
        if(complitedAnswers.length > 0) {
            complitedAnswers.forEach(item => {
                if(item == randomNumber) {
                    hitDuplicate = true;
                }
            });
            if(hitDuplicate) {
                randomQuestion();
            } else {
                indexOfQuestion = randomNumber;
                load();
            }
        }
        if(complitedAnswers.length == 0) {
            indexOfQuestion = randomNumber;
            load();
        }
    }
    complitedAnswers.push(indexOfQuestion);
};

const checkAnswer = el => {
    if(el.target.dataset.id == questions[indexOfQuestion].rightAnswer) {
        el.target.classList.add('correct');
        updateAnswerTracker('correct');
        score++;
    } else {
        el.target.classList.add('wrong');
        updateAnswerTracker('wrong');
    }
    disabledOptions();
}

for(option of optionElements) {
    option.addEventListener('click', e => checkAnswer(e));
}

const disabledOptions = () => {
    optionElements.forEach(item => {
        item.classList.add('disabled');
        if(item.dataset.id == questions[indexOfQuestion].rightAnswer) {
            item.classList.add('correct');
        }
    })
}

// удаление всех классов со всех ответов
const enableOptions = () => {
    optionElements.forEach(item => {
        item.classList.remove('disabled', 'correct', 'wrong');
    })
}

const answerTracker = () => {
    questions.forEach(() => {
        const div = document.createElement('div');
        answersTracker.appendChild(div);
    })
};

const updateAnswerTracker = status => {
    answersTracker.children[indexOfPage - 1].classList.add(`${status}`);
}

const validate = () => {
    if(!optionElements[0].classList.contains('disabled')) {
        alert('Вам нужно выбрать один из ваиантов ответа');
    } else {
        randomQuestion();
        enableOptions();
    }
}

const quizOver = () => {
    document.querySelector('.quiz-over-modal').classList.add('active');
    correctAnswer.innerHTML = score;
    numberOfAllQuestions2.innerHTML = questions.length;
};

const tryAgain = () => {
    window.location.reload();
};

btnTryAgain.addEventListener('click', tryAgain);

btnNext.addEventListener('click', () => {
    validate();
})

window.addEventListener('load', () => {
    randomQuestion();
    answerTracker();
});