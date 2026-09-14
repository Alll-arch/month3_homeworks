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


    function delay(value, ms, shouldFail = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      shouldFail ? reject(new Error(`Ошибка при обработке: ${value}`)) : resolve(value);
    }, ms)   ;
  });
}

console.log("Задание 1: Цепочка промисов с обработкой ошибок");

delay(1, 500)
  .then(res1 => {
    console.log(`Шаг 1: ${res1}`);
    return delay(res1 + 1, 500, true);   
  })
  .then(res2 => {
    console.log(`Шаг 2: ${res2}`); 
    return delay(res2 + 1, 500);
  })
  .catch(error => {
    console.error(`Перехват в .catch: ${error.message}`); 
  })
  .finally(() => {
    console.log(".finally сработает после завершения цепочки промисов, независимо от результата."); 
  });

async function runTask2() {
  console.log("Старт Задания 2 Аналог цепочки");
  try {
    const res1 = await delay(1, 500);
    console.log(`Шаг 1: ${res1}`);
    
    const res2 = await delay(res1 + 1, 500, true); 
    console.log(`Шаг 2: ${res2}`);
  } catch (error) {
    console.error(`Перехват: ${error.message}`);
  } finally {
    console.log("finally сработал");
  }

  const items = [];
  const results = [];

  for (const item of items) {
    const shouldFail = Math.random() > 0.7;
    
    try {
      const value = await delay(item, 300, shouldFail);
      results.push({ value, error: null });
    } catch (error) {
      results.push({ value: null, error: error.message });
    }
  }

  console.log("Итоговый массив результатов:");
  console.log(results);
}
setTimeout(runTask2, 1600);

async function runTask3() {

  console.log("тестируем Promise.all");
  try {
    await Promise.all([
      delay("A", 200),
      delay("B", 400, true), 
      delay("C", 600),
      delay("D", 100)
    ]);
  } catch (error) {
    console.error(`Promise.all упал при первой же ошибке: ${error.message}`);
  }

  console.log("тестируем Promise.allSettled");
  const rawResults = await Promise.allSettled([
    delay("A", 200),
    delay("B", 400, true),
    delay("C", 600),
    delay("D", 100)
  ]);

  const succeeded = rawResults
    .filter(r => r.status === "fulfilled")
    .map(r => r.value);

  const failed = rawResults
    .filter(r => r.status === "rejected")
    .map(r => r.reason.message);

  console.log("Успешные:", succeeded);
  console.log("Упавшие:", failed);

  console.log("тестируем Promise.race...");
  try {
    const winner = await Promise.race([
      delay("Полезные данные", 2000),
      delay("Таймаут соединения", 500, true) 
    ]);
    console.log(`Победил промис: ${winner}`); 
  } catch (error) {
    console.error(`В гонке победил сбой (быстрее 2000мс): ${error.message}`);
  }
}

setTimeout(runTask3, 4000);
