import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const btnStart = document.querySelector('button[data-start]');
const inputEl = document.querySelector('#datetime-picker');
btnStart.addEventListener('click', startTimer);

btnStart.disabled = true;

const refsSpan = {
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

let timerId = null;
let deadline = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    deadline = selectedDates[0];

    if (deadline <= Date.now()) {
      Notify.failure('Please choose a date in the future');
      return;
    }
    btnStart.disabled = false; 
  },
};

flatpickr('#datetime-picker', options);

function startTimer() {
  btnStart.disabled = true;
  inputEl.disabled = true;

  timerId = setInterval(() => {
    const deltaTime = deadline - Date.now();

    if (deltaTime <= 0) {
      clearInterval(timerId);
    } else {
      const timeObj = convertMs(deltaTime);
      renderTime(timeObj, refsSpan);
    }
  }, 1000);
}

/*Перебирает обьекты и выводит время */
function renderTime(calculateTime, refsContent) {
  Object.keys(calculateTime).forEach(key => {
    refsContent[key].textContent = calculateTime[key];
  });
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
    );
    
    return { days, hours, minutes, seconds };
  }
  
  function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
    // String(value).padStart(2, '0');
  }
  
  
  