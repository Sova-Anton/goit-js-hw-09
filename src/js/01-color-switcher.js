const btnStart = document.querySelector("[data-start]");
const btnStop = document.querySelector("[data-stop]");

let intervalId = null;
btnStop.disabled = true;

btnStart.addEventListener("click", onClickStart);
btnStop.addEventListener("click", onClickStop);

function onClickStart() {
    intervalId = setInterval(() => {        
       document.body.style.backgroundColor = getRandomHexColor()
    }, 1000)    

    if (btnStart) {
        btnStart.disabled = true;
        btnStop.disabled = false;
    } 
}

function onClickStop() {
    clearInterval(intervalId);
    btnStop.disabled = true;
    if (btnStop) {
        btnStart.disabled = false;
    }    
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}