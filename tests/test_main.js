'use strict';

let main = require('../main.js'),
	assert = require('assert'),
	fs = require('fs');

(function () {
	console.log('Testing reading contents from one file...');
	let chain = main.fromFiles(2, './tests/test.txt');
	// console.log('"'+chain.Generate(50)+'"');

	assert(chain.Generate(25).length > 0, 'Generates string');
})();

(function () {
	console.log('Testing reading contents from two files...');
	let chain = main.fromFiles(2, './tests/test.txt', './tests/test2.txt');
	// console.log('"'+chain.Generate(100)+'"');

	assert(chain.Generate(25).length > 0, 'Generates string');
})();

(function () {
	console.log('Testing building chain from buffer...');
	let buffer = fs.readFileSync('./tests/test.txt');
	assert(typeof buffer === 'object', 'Create buffer');
	let chain = main.fromBuffer(2, buffer);
	// console.log('"'+chain.Generate(50)+'"');
	assert(chain.Generate(10).length > 0, 'Generates string');
})();

(function () {
	console.log('Testing endOn...');
	let charSet = '.?!',
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