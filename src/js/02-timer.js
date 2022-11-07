// Напиши скрипт таймера, який здійснює зворотний відлік до певної дати. 
// Такий таймер може використовуватися у блогах та інтернет-магазинах, 
// сторінках реєстрації подій, під час технічного обслуговування тощо.

// Вибір дати
// Метод onClose() з об'єкта параметрів викликається щоразу під час закриття елемента інтерфейсу, який створює flatpickr. Саме у ньому варто обробляти дату, обрану користувачем. Параметр selectedDates - це масив обраних дат, тому ми беремо перший елемент.

// Якщо користувач вибрав дату в минулому, покажи window.alert() з текстом "Please choose a date in the future".
// Якщо користувач вибрав валідну дату (в майбутньому), кнопка «Start» стає активною.
// Кнопка «Start» повинна бути неактивною доти, доки користувач не вибрав дату в майбутньому.
// Натисканням на кнопку «Start» починається відлік часу до обраної дати з моменту натискання.

// Відлік часу
// Натисканням на кнопку «Start» скрипт повинен обчислювати раз на секунду, скільки часу залишилось до вказаної дати, і оновлювати інтерфейс таймера, показуючи чотири цифри: дні, години, хвилини і секунди у форматі xx:xx:xx:xx.

// Кількість днів може складатися з більше, ніж двох цифр.
// Таймер повинен зупинятися, коли дійшов до кінцевої дати, тобто 00:00:00:00.



import flatpickr from 'flatpickr';    //  бібліотеку flatpickr для того, щоб дозволити користувачеві кросбраузерно вибрати кінцеву дату і час.
import Notiflix from 'notiflix';      // бібліотека для відображення повідомлень користувачеві, замість window.alert()
import 'flatpickr/dist/flatpickr.min.css';   //   того щоб підключити CSS код бібліотеки в проект

// Посилання на датасет інпупа
const refs = {
  days: document.querySelector('[data-days'),
  hours: document.querySelector('[data-hours'),
  mins: document.querySelector('[data-minutes'),
  secs: document.querySelector('[data-seconds'),
};

//  об'єкт параметрів.
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    startButton.setAttribute('disabled', 'disabled');  // стан кнопки старт до вибору дати таймера

    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    }
    startButton.removeAttribute('disabled');
  },
};

const countdownTimer = flatpickr('#datetime-picker', options);
const startButton = document.querySelector('[data-start]');      // посилання на кнопку старт

let intervalId = null;

startButton.setAttribute('disabled', 'disabled');

startButton.addEventListener('click', onStartButtonClick);     // Слухач кнопки старт

// фунція татймера зворотного відліку
function onStartButtonClick() {
  const selectedDate = countdownTimer.selectedDates[0].getTime();   // параметр обратной дати
  intervalId = setInterval(() => {
    const currentDate = Date.now();
    const deltaTime = selectedDate - currentDate;
    if (deltaTime > 0) {
      const timeComponents = convertMs(deltaTime);
      updateClockface(timeComponents);
    } else {
      const timeComponents = convertMs(0);
      updateClockface(timeComponents);
      clearInterval(intervalId);
      setTimeout(() => {
        Notiflix.Notify.warning('Time is over');
      }, 0);
    }
  }, 1000);
}

//  Функція що повертає об'єкт з розрахованим часом, що залишився до кінцевої дати
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

// функція яка використовує метод padStart() і перед рендерингом інтефрейсу форматує значення.
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

// фунція для відображенняя таймера на HTML сторінки
function updateClockface({ days, hours, minutes, seconds }) {
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.mins.textContent = minutes;
  refs.secs.textContent = seconds;
}