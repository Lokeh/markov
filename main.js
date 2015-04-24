'use strict';

let Markov = require('./markov.js'),
	fs = require('fs');

module.exports.buildChainFromFiles = function (prefixLength, file) {
	//let files = Array.prototype.slice.apply(arguments); // create array of filenames from arbitrary arguments
	let chain = Markov.Chain(prefixLength);

	let contents = fs.readFileSync(file, 'utf8');

	chain.Build(contents)

	return chain;
};