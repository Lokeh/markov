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

let endOn = function (string, charSet) {
	function endsWith(string, chars) {
		let ends = false,
			last = string[string.length-1];

		for (let c of chars) {
			if (last === c) {
				ends = true;
			}
		}

		return ends;
	}

	function lastIndexOf(string, chars) {
		let ends = false,
			lastIndex = -1,
			maxIndex = -1;

		for (let c of chars) {
			lastIndex = string.lastIndexOf(c);
			maxIndex = (maxIndex >= lastIndex) ? maxIndex : lastIndex;
		}

		return maxIndex;
	}

	if (endsWith(string, charSet))
		return string;

	let punctIndex = lastIndexOf(string, charSet);

	return string.substr(0, punctIndex+1);
};

module.exports.fromFiles = buildChainFromFiles;
module.exports.fromBuffer = buildChainFromBuffer;
module.exports.endOn = endOn;

// Get command line arguments to read in filenames
let argv = process.argv.slice(2);

let markovChain = buildChainFromFiles.apply(this, [2].concat(argv));

console.log(endOn(markovChain.Generate(50), '.?!'));