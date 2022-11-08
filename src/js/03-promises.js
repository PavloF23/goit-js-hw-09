// Напиши скрипт, який на момент сабміту форми викликає функцію createPromise(position, delay) 
// стільки разів, скільки ввели в поле amount. Під час кожного виклику передай їй номер промісу (position),
// що створюється, і затримку, враховуючи першу затримку (delay), введену користувачем, і крок (step).

// function createPromise(position, delay) {
//   const shouldResolve = Math.random() > 0.3;
//   if (shouldResolve) {
//     // Fulfill
//   } else {
//     // Reject
//   }
// }

// Доповни код функції createPromise таким чином, щоб вона повертала один проміс, який виконується 
// або відхиляється через delay часу. Значенням промісу повинен бути об'єкт, в якому будуть 
// властивості position і delay зі значеннями однойменних параметрів. Використовуй початковий код 
// функції для вибору того, що потрібно зробити з промісом - виконати або відхилити.

// createPromise(2, 1500)
//   .then(({ position, delay }) => {
//     console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
//   })
//   .catch(({ position, delay }) => {
//     console.log(`❌ Rejected promise ${position} in ${delay}ms`);
//   });


import Notiflix from 'notiflix';   // бібліотека для відображення повідомлень користувачеві, замість window.alert()

const form = document.querySelector('.form');  // посилання на форму

form.addEventListener('submit', onFormSubmit); // прослуховувач форми

// функція для виклика промісу
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

//фунція виконання сабміту
function onFormSubmit(e) {
  e.preventDefault();

  let delayInput = Number(e.currentTarget.elements.delay.value); // значеня затримкі
  const stepInput = Number(e.currentTarget.elements.step.value);  // значеня кроків
  const amountInput = Number(e.currentTarget.elements.amount.value);  // значення кількості викликів функції створення промісу

  for (let i = 1; i <= amountInput; i += 1) {
    createPromise(i, delayInput)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });

    delayInput += stepInput;
  }
}