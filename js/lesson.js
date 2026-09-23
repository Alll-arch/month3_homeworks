const tabBlocks = document.querySelectorAll('.tab_content_block');
const tabs = document.querySelectorAll('.tab_content_item');
const tabsParent = document.querySelector('.tab_content_items');

let currentTabIndex = 0;
let tabInterval;

const showBlock = (index = 0) => {
  currentTabIndex = index; 
  tabBlocks.forEach((item, i) => item.classList.toggle('active', i === index));
  tabs.forEach((item, i) => item.classList.toggle('active', i === index));
}

const startAutoSlider = () => {
  clearInterval(tabInterval); 
  tabInterval = setInterval(() => {
    currentTabIndex = (currentTabIndex + 1) % tabs.length;
    showBlock(currentTabIndex);
  }, 5000);
}

showBlock();
startAutoSlider();

tabsParent.onclick = (event) => {
  const selected = event.target.closest('.tab_content_item');
  if (!selected) return;

  const selectedIndex = [...tabs].indexOf(selected);
  showBlock(selectedIndex);
  startAutoSlider();
}

const somInput = document.querySelector('#som');
const usdInput = document.querySelector('#usd');
const eurInput = document.querySelector('#eur');

const inputs = [somInput, usdInput, eurInput];

const converter = () => {
  inputs.forEach((element) => {
    if (!element) return;

    element.oninput = async () => {
      if (element.value === '') {
        inputs.forEach(input => { if (input !== element) input.value = ''; });
        return;
      }

      try {
        const response = await fetch('../data/converter.json');
        const data = await response.json();
        const usdRate = data.usd;
        const eurRate = data.eur; 

        const value = parseFloat(element.value);
        if (isNaN(value)) return;

        let somValue = 0;
        if (element.id === 'som') somValue = value;
        if (element.id === 'usd') somValue = value * usdRate;
        if (element.id === 'eur') somValue = value * eurRate;

        if (somInput !== element) somInput.value = somValue.toFixed(2);
        if (usdInput !== element) usdInput.value = (somValue / usdRate).toFixed(2);
        if (eurInput !== element) eurInput.value = (somValue / eurRate).toFixed(2);

      } catch (error) {
        console.error("Ошибка конвертации:", error);
      }
    };
  });
};

converter();

const TODO_API = 'https://jsonplaceholder.typicode.com/todos/';
const btnNext = document.querySelector('#btn-next');
const btnPrev = document.querySelector('#btn-prev'); 
const card = document.querySelector('.card');

let num = 1;
const MIN_CARDS = 1;
const MAX_CARDS = 200;

const fetchTodo = async (id = 1) => {
  try {
    const response = await fetch(`${TODO_API}{id}`);
    if (!response.ok) {
      throw new Error('Сетевая ошибка при получении данных');
    }
    const { id: idCard, title, completed } = await response.json();
    const color = completed ? 'green' : 'red';
    card.style.borderColor = color;
    card.innerHTML = 
      card.innerHTML = `
      <p>ID -> ${idCard}</p>
      <p>${title}</p>
      <p style="color:${color}">${completed ? 'Completed' : 'Not Completed'}</p>
    `;
    ;
 } catch (error) {
    card.innerHTML = '<p style="color:red">Ошибка загрузки данных</p>';
    console.error(error);
  }
};
const changeCard = (direction) => {
  if (direction === 'next') {
    num = num >= MAX_CARDS ? MIN_CARDS : num + 1;
  } else if (direction === 'prev') {
    num = num <= MIN_CARDS ? MAX_CARDS : num - 1;
  }
  fetchTodo(num);
};

btnNext.onclick = () => changeCard('next');
btnPrev.onclick = () => changeCard('prev');
