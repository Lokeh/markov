'use strict';

let Markov = require('./markov.js'),
	fs = require('fs');

let buildChainFromFiles = function (prefixLength) { // buildChainFromFiles(prefixLength, file1, file2, file3, ...)
	let chain = Markov.Chain(prefixLength);
	let files = Array.prototype.slice.call(arguments, 1);
	let contents = '';

	files.forEach(function (file) {
		contents += fs.readFileSync(file, 'utf8');
	});

	chain.Build(contents);

	return chain;
};

// Get command line arguments to read in filenames
let argv = process.argv.slice(2);

let markovChain = buildChainFromFiles.apply(this, [2].concat(argv));

console.log(markovChain.Generate(50));

module.exports.buildChain = buildChainFromFiles;