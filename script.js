const buttons = document.querySelectorAll('.button');
const display = document.querySelector('.display');
let expression = "";

function handleButtonClick(event) {
    const val = event.target.textContent;

    if (val === '=') {
        let currentText = display.innerHTML;

        if (currentText === '0÷0') {
            display.innerHTML = 'Нельзя';
            expression = '';
            return;
        }

        if (currentText.includes('%')) {
            let pieces = currentText.split('%');
            let num1 = Number(pieces[0]);
            let num2 = Number(pieces[1]);
            expression = (num1 * num2) / 100;
            display.innerHTML = expression;
            return;
        }

        let formattedText = currentText.replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-');
        let result = eval(formattedText);
        display.innerHTML = result;
        expression = String(result);

    } else if (val === 'AC') {
        expression = '';
        display.innerHTML = '0';

    } else if (val === '%') {
        expression = display.innerHTML + '%';
        display.innerHTML = expression;

    } else if (val === '.') {
        let lastChar = display.innerHTML[display.innerHTML.length - 1];
        if (lastChar === '.') {
            return;
        }
        expression += val;
        display.innerHTML = expression;

    } else {
        if (display.innerHTML === '0') {
            expression = val;
        } else {
            expression += val;
        }
        display.innerHTML = expression;
    }
}

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', handleButtonClick);
}
