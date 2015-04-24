'use strict';

let main = require('../main.js'),
	assert = require('assert');;

(function () {
	console.log('Testing reading contents from one file...')
	let chain = main.buildChainFromFiles(2, './tests/test.txt');
	console.log('"'+chain.Generate(50)+'"');

	assert(chain.Generate(25).length > 0)
})();