'use strict';

let Markov = require('./markov.js'),
	fs = require('fs');

let readFiles = function () { // readFiles(file1, file2, file3, ...) => String[]
	return Array.prototype.slice.call(arguments).map(function (file) {
		return fs.readFileSync(file, 'utf8');
	});
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
module.exports.endOn = endOn;

if (!module.parent) { // being accessed from the command line...
	// Get command line arguments to read in filenames
	let argv = process.argv.slice(2);

	let markovChain = Markov.Chain();

	// Build chain from files
	readFiles.apply(null, argv).forEach(function (contents) {
		contents.split('\n').forEach(markovChain.Build);
	});

	// console.log(markovChain.debug());

	console.log(markovChain.Generate(50));
}