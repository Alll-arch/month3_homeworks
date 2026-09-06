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

const moveBlock = () => {
 
    const parentWidth = document.querySelector('.parent_block').clientWidth;
    const childWidth = childBlock.clientWidth;
    const maxOffset = parentWidth - childWidth;

    if (positionX < maxOffset) {
        positionX++; 
        childBlock.style.left = `${positionX}px`; 
        requestAnimationFrame(moveBlock); 
    }
};

moveBlock();
