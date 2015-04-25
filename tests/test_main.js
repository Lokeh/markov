'use strict';

let main = require('../main.js'),
	assert = require('assert'),
	fs = require('fs');

(function () {
	console.log('Testing reading contents from one file...');
	let chain = main.fromFiles(2, './tests/test.txt');
	console.log('"'+chain.Generate(50)+'"');

	assert(chain.Generate(25).length > 0);
})();

(function () {
	console.log('Testing reading contents from two files...');
	let chain = main.fromFiles(2, './tests/test.txt', './tests/test2.txt');
	console.log('"'+chain.Generate(100)+'"');

	assert(chain.Generate(25).length > 0);
})();

(function () {
	console.log('Testing building chain from buffer...');
	let buffer = fs.readFileSync('./tests/test.txt');
	assert(typeof buffer === 'object');
	let chain = main.fromBuffer(2, buffer);
	console.log('"'+chain.Generate(50)+'"');
	assert(chain.Generate(10).length > 0);
})();

(function () {
	console.log('Testing endOnPunctuation...');
	let string1 = 'asdf',
		string2 = 'asdf.',
		string3 = 'asdf?',
		string4 = 'asdf!',
		string5 = 'asdf. jkl',
		string6 = 'asdf? jkl!';

	assert(main.endOnPunctuation(string1) === '');
	assert(main.endOnPunctuation(string2) === string2);
	assert(main.endOnPunctuation(string3) === string3);
	assert(main.endOnPunctuation(string4) === string4);
	assert(main.endOnPunctuation(string5) === 'asdf.');
	assert(main.endOnPunctuation(string6) === string6);
})();

console.log('All assertions passed.');