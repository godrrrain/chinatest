class Quiz
{
    constructor(questions)
    {
        //Массив с вопросами
        this.questions = questions;

        //Количество набранных очков
        this.score = 0;

        //Номер текущего вопроса
        this.current = 0;
    }

    Click(index)
    {
        //Добавляем очки
        let value = this.questions[this.current].Click(index);
        this.score += value;

        let correct = -1;

        //Если было добавлено хотя бы одно очко, то считаем, что ответ верный
        if(value > 0)
        {
            correct = index;
        }

        this.Next();

        return correct;
    }

    //Переход к следующему вопросу
    Next()
    {
        this.current++;
    }
}
 
//Класс, представляющий вопрос
class Question
{
    constructor(text, answers)
    {
        this.text = text;
        this.answers = answers;
    }
 
    Click(index)
    {
        return this.answers[index].value;
    }
}
 
//Класс, представляющий ответ
class Answer
{
    constructor(text, value)
    {
        this.text = text;
        this.value = value;
    }
}

//Массив с вопросами
const questions =
[
    new Question("How many hours do you play video games per week?",
    [
        new Answer("0 hour", 15),
        new Answer("22 hours", -30),
        new Answer("3 hours", 15),
        new Answer("4 hours", -30)
    ]),
    new Question("What is the best country in the world ?",
    [
        new Answer("Germany", -30),
        new Answer("China", 50),
        new Answer("USA", -30),
        new Answer("Monaco", -30)
    ]),
    new Question("Is Taiwan a country?",
    [
        new Answer("True", -30000000),
        new Answer("I think yes", -30000000),
        new Answer("No", 420),
        new Answer("What is that?", 420)
    ]),
    new Question("What happened in Tiananmen Square in 1989?",
    [
        new Answer("Nothing", 3000),
        new Answer("Nothing", 3000),
        new Answer("Something", -30000000),
        new Answer("Nothing", 3000)
    ]),
    new Question("How do you find the taste of Lao Gan Ma chilli sauce?",
    [
        new Answer("The best", 3000),
        new Answer("Bad", -69420),
        new Answer("Ok", -30),
        new Answer("What is that?", -30)
    ])
];
 
//Сам тест
const quiz = new Quiz(questions);

let headElem = document.getElementById("head");
let buttonsElem = document.getElementById("buttons");
let questionImg = document.getElementById("questionMainImg");
let score = document.getElementById("score_main");
let answerImg = document.getElementById("answerImg");
let firstGif = document.getElementById("first_gif");
let secondGif = document.getElementById("second_gif");


Update();
 
//Обновление теста
function Update()
{
    answerImg.className = "img_invisible";
    answerImg.src = "";
    firstGif.className = "img_invisible";
    firstGif.src = "";
    secondGif.className = "img_invisible";
    secondGif.src = "";
    score.textContent = `Score ${quiz.score}`;

    //Проверяем, есть ли ещё вопросы
    if(quiz.current < quiz.questions.length)
    {
        //Если есть, меняем вопрос в заголовке
        headElem.textContent = quiz.questions[quiz.current].text;

        questionImg.src = `/static/main/img/questions/${quiz.current}.jpg`;

        //Удаляем старые варианты ответов
        buttonsElem.innerHTML = "";

        //Создаём кнопки для новых вариантов ответов
        for(let i = 0; i < quiz.questions[quiz.current].answers.length; i++)
        {
            let btn = document.createElement("button");
            btn.className = "button button" + i;

            btn.textContent = quiz.questions[quiz.current].answers[i].text;

            btn.setAttribute("index", i);

            buttonsElem.appendChild(btn);
        }
 
       //Вызываем функцию, которая прикрепит события к новым кнопкам
       Init();
   }
   else
   {
       //Если это конец, то выводим результат
       buttonsElem.innerHTML = "";
       questionImg.parentNode.removeChild(questionImg);
       headElem.textContent = "Enter your name:";
       score.textContent = "Score: " + quiz.score;

       let nameInput = document.createElement("INPUT");
       nameInput.setAttribute("type", "text");
       nameInput.setAttribute("value", "Anonymous");
       nameInput.setAttribute("size", "15");
       nameInput.setAttribute("maxlength", "18");
       nameInput.setAttribute("id", "name_inp");
       nameInput.className = "name_input";
       buttonsElem.appendChild(nameInput);

       let resultImg = document.createElement("img");
       if(quiz.score > 0)
       {
           resultImg.src = `/static/main/img/results/nice.jpg`;
       }
       else 
       {
           resultImg.src = `/static/main/img/results/lose.jpg`;
       }
       resultImg.className = "result_img";
       buttonsElem.appendChild(resultImg);

       let submitBtn = document.createElement("button");
       submitBtn.textContent = "Submit";
       submitBtn.className = "submitBtn";
       submitBtn.setAttribute("onclick", `document.location='adding/?name=${document.getElementById("name_inp").value}&score=${quiz.score}'`);
       buttonsElem.appendChild(submitBtn);

   }
}
 
function Init()
{
    //Находим все кнопки
    let btns = document.getElementsByClassName("button");

    for(let i = 0; i < btns.length; i++)
    {
        //Прикрепляем событие для каждой отдельной кнопки
        //При нажатии на кнопку будет вызываться функция Click()
        btns[i].addEventListener("click", function (e) { Click(e.target.getAttribute("index")); });
    }
}

function setAfterQuestionImage(check, value)
{
    if(check == false)
    {
        answerImg.src = `/static/main/img/after_questions/${value}.jpg`;
        answerImg.className = "answer_visible";
    }
    else
    {
        answerImg.src = `/static/main/img/after_questions/${value}.jpg`;
        answerImg.className = "answer_visible";
    }
}

function setFirstGif(check)
{
    let randomNum = Math.floor(Math.random() * 6);

    if(check == false)
    {
        firstGif.src = `/static/main/gif/after/false/1/${randomNum}.gif`;
        firstGif.className = "first_gif";
    }
    else
    {
        firstGif.src = `/static/main/gif/after/correct/1/${randomNum}.gif`;
        firstGif.className = "first_gif";
    }
}

function setSecondGif(check)
{
    let randomNum = Math.floor(Math.random() * 6);

    if(check == false)
    {
        secondGif.src = `/static/main/gif/after/false/2/${randomNum}.gif`;
        secondGif.className = "second_gif";
    }
    else
    {
        secondGif.src = `/static/main/gif/after/correct/2/${randomNum}.gif`;
        secondGif.className = "second_gif";
    }
}
 
function Click(index)
{ 
    let value = quiz.questions[quiz.current].Click(index);

    //Получаем номер правильного ответа
    let correct = quiz.Click(index);

    //Находим все кнопки
    let btns = document.getElementsByClassName("button");

    if(correct != -1)
    {
        btns[correct].classList.add("button_correct");
    }

    //Делаем кнопки серыми
    for(let i = 0; i < btns.length; i++)
    {
        if (i != correct)
        {
            btns[i].classList.add("button_passive");
        }
    }

    if(index != correct)
    {
        setTimeout(setFirstGif, 1000, false);
        setTimeout(setSecondGif, 2500, false);
        setTimeout(setAfterQuestionImage, 4000, false, value);
    } 
    else 
    {
        setTimeout(setFirstGif, 1000, true);
        setTimeout(setSecondGif, 2500, true);
        setTimeout(setAfterQuestionImage, 4000, true, value);
    }
 
    //Ждём секунду и обновляем тест
    setTimeout(Update, 6000);
}
