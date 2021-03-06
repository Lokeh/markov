'use strict';

const main = require('../main.js');
const Markov = require('../markov.js');
const assert = require('assert');
const fs = require('fs');

(function () {
	console.log('Testing reading contents from one file...');
	const stringArray = main.readFiles('./tests/test.txt');

	assert(stringArray[0].length > 0, 'Read string');
})();

(function () {
	console.log('Testing reading contents from two files...');
	const stringArray = main.readFiles('./tests/test.txt', './tests/test2.txt');

	assert(stringArray[0].length > 0 && stringArray[1].length > 0, 'Read strings');
})();

(function () {
	console.log('Testing endOn...');
	const charSet = '.?!',
		string1 = 'asdf',
		string2 = 'asdf.',
		string3 = 'asdf?',
		string4 = 'asdf!',
		string5 = 'asdf. jkl',
		string6 = 'asdf? jkl!';

	assert(main.endOn(string1, charSet) === '', 'No punctuation');
	assert(main.endOn(string2, charSet) === string2, 'End on period');
	assert(main.endOn(string3, charSet) === string3, 'End on question mark');
	assert(main.endOn(string4, charSet) === string4, 'end on exclamation');
	assert(main.endOn(string5, charSet) === 'asdf.', 'Contains period');
	assert(main.endOn(string6, charSet) === string6, 'Contains ?, end on !');
})();

console.log('All assertions passed.');