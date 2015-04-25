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

console.log('All assertions passed.');