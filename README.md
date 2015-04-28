# Markov
A node module for creating Markov chains from a seed text and generating new strings. Requires ES6.

Based off of the Go code-walk here:
https://golang.org/doc/codewalk/markov/

###Usage

From the command line, takes in any number of seed files and outputs a string of at most 50 characters.
```bash
iojs main.js seed1.txt seed2.txt seed3.txt [...] seedN.txt
```

As a module:
```javascript
let markov = require('markov');
let chain = markov.Chain(2); // create Markov chain of order 2

chain.Build('Here is some seed text!');
console.log(chain.Generate(3)); // 'Here is some'
```

The functions in `markov` are also chainable, so you can do:
```javascript
let tenWords = markov.Chain(2).Build(seedText).Generate(10);
```
