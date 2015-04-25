'use strict';

let Markov = require('./markov.js'),
	fs = require('fs');

let parseDelimiter = function (chain, prefixLength, string, delimiter) {
	// let chain = Markov.Chain(prefixLength);
	
	for (let s of string.split(delimiter)) {
		chain.Build(s);
	}

	return chain;
};

let readFiles = function () { // readFiles(file1, file2, file3, ...) => String[]
	let files = Array.prototype.slice.call(arguments).map(function (file) {
		return fs.readFileSync(file, 'utf8');
	});

	return files;
};

let fromBuffer = function (chain, prefixLength, buffer) {
	// let chain = Markov.Chain(prefixLength);
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
		let lastIndex = -1,
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

module.exports.readFiles = readFiles;
module.exports.fromBuffer = fromBuffer;
module.exports.endOn = endOn;
module.exports.parseDelimiter = parseDelimiter;

// Get command line arguments to read in filenames
// let argv = process.argv.slice(2);

// let markovChain = Markov.Chain();

// // readFiles.apply(this, [markovChain, 2].concat(argv));

// console.log(endOn(markovChain.Generate(50), '.?!'));