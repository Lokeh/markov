'use strict';

let Markov = require('./markov.js'),
	fs = require('fs');

module.exports.buildChainFromFiles = function (prefixLength) {
	let chain = Markov.Chain(prefixLength);
	let files = Array.prototype.slice.call(arguments, 1);
	let contents = '';

	files.forEach(function (file) {
		contents += fs.readFileSync(file, 'utf8');
	});

	chain.Build(contents);

	return chain;
};