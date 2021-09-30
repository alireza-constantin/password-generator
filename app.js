const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');

clipboardEl.addEventListener('click', () => {
	const password = resultEl.innerText;
	const textarea = document.createElement('textarea');

	if (!password) {
		return;
	}

	textarea.value = password;
	document.body.appendChild(textarea);
	textarea.select();
	document.execCommand('copy');
	textarea.remove();

	const div = document.createElement('div');
	div.classList.add('pop-up');
	div.innerText = 'Password Copied';
	const span = document.createElement('span');
	span.classList.add('remove-pop-up');
	span.innerText = 'X';
	div.append(span);
	document.body.append(div);

	span.addEventListener('click', () => div.remove());

	setTimeout(() => {
		div.remove();
	}, 5000);
});

const randomFunc = {
	lower: getRandomLower,
	upper: getRandomUpper,
	number: getRandomNumber,
	symbol: getRandomSymbol,
};

generateEl.addEventListener('click', function () {
	const length = +lengthEl.value;
	const hasLower = lowercaseEl.checked;
	const hasUpper = uppercaseEl.checked;
	const hasNumber = numbersEl.checked;
	const hasSymbol = symbolsEl.checked;

	resultEl.innerText = generatePassword(
		hasLower,
		hasUpper,
		hasNumber,
		hasSymbol,
		length
	);
});

const generatePassword = (lower, upper, number, symbol, length) => {
	let generatedPassword = '';

	const typeCount = lower + upper + number + symbol;
	const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
		(obj) => Object.values(obj)[0]
	);

	// console.log(typesArr);

	if (typesArr.length === 0) {
		return '';
	}

	let funcNames = [];

	for (let i = 0; i < length; i += typesArr.length) {
		typesArr.forEach((type) => {
			const funcName = Object.keys(type)[0];
			funcNames.push(funcName);
		});
	}

	shuffle(funcNames).forEach(
		(name) => (generatedPassword += randomFunc[name]())
	);

	const finalPassword = generatedPassword.slice(0, length);

	return finalPassword;
};

function shuffle(arr) {
	for (let i = arr.length - 1; i > 0; i--) {
		const SI = Math.floor(Math.random() * (i + 1));
		arr[i] = arr[SI];
		arr[SI] = arr[i];
	}
	return arr;
}

function getRandomLower() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
	return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
	const symbols = '!@#$%^&*(){}[]=<>/,.';
	return symbols[Math.floor(Math.random() * symbols.length)];
}
