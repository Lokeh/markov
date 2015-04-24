"use strict";

// Prefix definition, for ease of use
let Prefix = function (length) {
	this.words = Array(length).join(',').split(',');
};

// Return the words in the Prefix joined together, to use as Map key
Prefix.prototype.toString = function () {
	return this.words.filter(function (el) {
		return el !== ''; // don't 
	}).join(' ');
};

// Removes first word and appends new word
Prefix.prototype.shift = function (word) {
	this.words.shift();
	this.words.push(word);
};

module.exports.Chain = function (prefixLength) {
	let chain = new Map(),
		length = prefixLength || 2;

	return {
		// Build the chain based off a string, 'contents'
		Build: function (contents) {
			let p = new Prefix(length),
				key,
				tempArray;
			contents.split(' ').forEach(function (s) { // split the string into an array of words
				key = p.toString(); // get the current prefix to use as a key (starting value '')

				if (chain.get(key) === undefined) { // if we haven't added any suffixes to this prefix
					chain.set(key, Array(s)); // create an array for the key with the suffix `s` as it's only element
				}
				else { // the array has already been created
					tempArray = chain.get(key); // get a copy of the array
					tempArray.push(s); // push the new suffix `s` onto that copy
					chain.set(key, tempArray); // set the new array of suffixes as the contents of `key`
				}
				p.shift(s); // pop off the first word, append the suffix `s` to create the next prefix
			});
		},
		Generate: function (numberOfWords) {
			// Generate a string of words based off the current chain
			let p = new Prefix(length),
				words = [], // this is our list of words for our sentence
				suffixes,
				next;

			for (let i = 0; i < numberOfWords; i++) {
				suffixes = chain.get(p.toString()); // get the array of suffixes for the current prefix
				if (suffixes === undefined || suffixes.length === 0) { // if there are no suffixes, exit
					break;
				}
				next = suffixes[Math.floor(Math.random()*suffixes.length)]; // Grab a random suffix
				words.push(next); // Push the suffix onto the list of words
				p.shift(next); // Shift the suffix onto thel prefix to use in the next iteration
			}

			return words.join(' '); // return the list of words joined together by spaces
		}
	}
};



