const gmailInput = document.querySelector('#gmail_input');
const gmailButton = document.querySelector('#gmail_button');
const gmailResult = document.querySelector('#gmail_result');

const regExp = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

gmailButton.onclick = () => {
    if (regExp.test(gmailInput.value)) {
        gmailResult.innerHTML = 'Верный формат почты!';
        gmailResult.style.color = 'green';
    } else {
        gmailResult.innerHTML = 'Неверный формат почты!';
        gmailResult.style.color = 'red';
    }
};


const childBlock = document.querySelector('.child_block');

let positionX = 0;
let positionY = 0;
let direction = 'right';


const moveBlock = () => {
 
    const parentWidth = document.querySelector('.parent_block').clientWidth;
    const parentHeight = document.querySelector('.parent_block').clientHeight;
    const childWidth = childBlock.clientWidth;
    const childHeight = childBlock.clientHeight;

    const maxOffsetWidth = parentWidth - childWidth;
    const maxOffsetHeight = parentHeight - childHeight;

    if (direction === 'right') {
    if (positionX < maxOffsetWidth) {
      positionX++;
    } else {
      direction = 'down'; 
    }
  } else if (direction === 'down') {
    if (positionY < maxOffsetHeight) {
      positionY++;
    } else {
      direction = 'left'; 
    }
  } else if (direction === 'left') {
    if (positionX > 0) {
      positionX--;
    } else {
      direction = 'up'; 
    }
  } else if (direction === 'up') {
    if (positionY > 0) {
      positionY--;
    } else {
      direction = 'right'; 
    }
  }

  childBlock.style.left = `${positionX}px`;
  childBlock.style.top = `${positionY}px`;

        requestAnimationFrame(moveBlock); 
    };

moveBlock();


const secondsDisplay = document.querySelector('#seconds');
const startButton = document.querySelector('#start');
const stopButton = document.querySelector('#stop');
const resetButton = document.querySelector('#reset');

let timerId = null;
let currentSeconds = 0;

const updateDisplay = () => {
    secondsDisplay.textContent = currentSeconds;
};

startButton.onclick = () => {
    if (timerId === null) {
        timerId = setInterval(() => {
            currentSeconds++;
            updateDisplay();
        }, 1000);
    }
};

stopButton.onclick = () => {
    clearInterval(timerId);
    timerId = null; 
};

resetButton.onclick = () => {
    clearInterval(timerId);
    timerId = null;
    currentSeconds = 0;
    updateDisplay();
};


const firstPromise = new Promise((resolve, reject) => {
    const isSuccess = true; 
    if (isSuccess) {
        resolve("Первый промис успешно выполнился!");
    } else {
        reject("Первый промис завершился ошибкой!");
    }
});

firstPromise
    .then(
        (successData) => {
            console.log("Резолв 1:", successData);
            return "Данные переданы во второй промис";
        },
        (errorData) => {
            console.log("Реджект 1:", errorData);
            return "Данные после ошибки переданы во второй промис";
        }
    )
    .then(
        (nextSuccessData) => {
            console.log("Резолв 2:", nextSuccessData);
        },
        (nextErrorData) => {
            console.log("Реджект 2:", nextErrorData);
        }
    );