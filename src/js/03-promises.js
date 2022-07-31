import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');
const delayInput = document.querySelector("input[name='delay']");
const stepInput = document.querySelector("input[name='step']");
const amountInput = document.querySelector("input[name='amount']");

form.addEventListener('submit', handleSubmit);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;

      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
}

function handleSubmit(e) {
  e.preventDefault();

  const step = Number(stepInput.value);
  const amount = Number(amountInput.value);
  let delay = Number(delayInput.value);

  for (let i = 1; i <= amount; i += 1) {
    /* Вызываем Промисы с помощью цикла*/

    createPromise(i, delay)
      .then(data => Notify.success(data))
      .catch(data => Notify.failure(data));

    delay += step;
  }
}
