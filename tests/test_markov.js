"use strict";

let Markov = require('../markov.js'),
	assert = require('assert');

(function () {
	console.log('Testing single word seed... ');
	let markov = new Markov.Chain(1);

	markov.Build('asdf');
	assert.strictEqual(markov.Generate(1), 'asdf', 'generates word');
})();

(function () {
	console.log('Testing small seed text...');
	let markov = new Markov.Chain();
	let contents = 'This is just a simple test. This is another very simple test. There are so many simple tests used in this test that I\'m not sure it\'s even that simple anymore.';
	let length = contents.split(' ').length;

	markov.Build(contents);
	assert(markov.Generate(length).length > 0, 'generate text');
})();

(function () {
	console.log('Testing two seed texts...');
	let markov = new Markov.Chain();
	let seed1 = 'asdf jkl; asdf';
	let seed2 = 'jkl; asdf jkl;';

	markov.Build(seed1);
	markov.Build(seed2);

	let string = markov.Generate(4).split(' ');
	assert(string.length === 4, 'contains 4 words');
})();

(function () {
	console.log('Testing debug...');
	let markov = new Markov.Chain();
	let contents = 'This is just a simple test. This is another very simple test. There are so many simple tests used in this test that I\'m not sure it\'s even that simple anymore.';

	markov.Build(contents);
	// console.log(markov.debug());
	assert(typeof markov.debug() === 'string', 'Debug is string');
})();

console.log('All assertions passed.');