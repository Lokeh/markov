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

let endOnPeriod = function (string) {

};

module.exports.fromFiles = buildChainFromFiles;
module.exports.fromBuffer = buildChainFromBuffer;

// Get command line arguments to read in filenames
let argv = process.argv.slice(2);

let markovChain = buildChainFromFiles.apply(this, [2].concat(argv));

console.log(markovChain.Generate(50));