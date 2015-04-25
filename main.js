'use strict';

let Markov = require('./markov.js'),
	fs = require('fs');

let buildChainFromFiles = function (prefixLength) { // buildChainFromFiles(prefixLength, file1, file2, file3, ...)
	let chain = Markov.Chain(prefixLength);
	let files = Array.prototype.slice.call(arguments, 1);

	files.forEach(function (file) {
		chain.Build(fs.readFileSync(file, 'utf8'));
	});

	return chain;
};

let buildChainFromBuffer = function (prefixLength, buffer) {
	let chain = Markov.Chain(prefixLength);
	chain.Build(buffer.toString('utf8'));

	return chain;
};

let endOnPunctuation = function (string) { //, punctuation) {
	function endsWith(string, punct) {
		let ends = false,
			last = string[string.length-1];

		for (let c of punct) {
			if (last === c) {
				ends = true;
			}
		}

		return ends;
	}

	function lastIndexOf(string, punct) {
		let ends = false,
			lastIndex = [];

		for (let c of punct) {
			lastIndex.push(string.lastIndexOf(c));
		}

		var maxIndex = Math.max.apply(Math, lastIndex);

		return maxIndex;
	}

	if (endsWith(string, '.?!'))
		return string;

	let punctIndex = lastIndexOf(string, '.?!');

	return string.substr(0, punctIndex+1);
};

module.exports.fromFiles = buildChainFromFiles;
module.exports.fromBuffer = buildChainFromBuffer;
module.exports.endOnPunctuation = endOnPunctuation;

// Get command line arguments to read in filenames
let argv = process.argv.slice(2);

let markovChain = buildChainFromFiles.apply(this, [2].concat(argv));

console.log(endOnPunctuation(markovChain.Generate(50)));