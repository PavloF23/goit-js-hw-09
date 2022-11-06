// Напиши скрипт, який після натискання кнопки «Start», раз на секунду змінює колір фону <body> на 
//випадкове значення, використовуючи інлайн стиль. Натисканням на кнопку «Stop» зміна кольору фону 
//повинна зупинятися.

// УВАГА
// Враховуй, що на кнопку «Start» можна натиснути нескінченну кількість разів.
// Зроби так, щоб доки зміна теми запущена, кнопка «Start» була неактивною(disabled).

// Для генерування випадкового кольору використовуй функцію getRandomHexColor.

// function getRandomHexColor() {
//     return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
//   }



const startBtn = document.querySelector('[data-start]');   // посиланняна кнопку старт
const stopBtn = document.querySelector('[data-stop]');      // посилання на кнопку стоп

let timerId = null;

startBtn.addEventListener('click', onStartButtonClick);     // прослуховувач кнопки старт
stopBtn.addEventListener('click', onStopButtonClick);       // прослуховувач кнопки старт

stopBtn.setAttribute('disabled', 'disabled');       // стартовий стан кнопки СТОП - неактивна

// функція для старту  змінює колір фону <body> раз на секунду
function onStartButtonClick(e) {
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);

  setAttributeOnButton(stopBtn, startBtn);
}

// функція для стопу змінює колір 
function onStopButtonClick() {
  clearInterval(timerId);
  setAttributeOnButton(startBtn, stopBtn);
}

// функція для генерування випадкового кольору
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

// функція для зміни стану кнопок  в  активний/неактивний
function setAttributeOnButton(enabledButton, disabledButton) {
  enabledButton.removeAttribute('disabled');
  disabledButton.setAttribute('disabled', 'disabled');
}