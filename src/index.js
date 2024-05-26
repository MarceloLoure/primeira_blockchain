"use strict";
const Blockchain = require('./classes/Blockchain');
const myChain = new Blockchain();
myChain.loadBlockchain();
myChain.addBlock({
    sender: 'Alice',
    recipient: 'Bob',
    amount: 100
});
myChain.addBlock({
    sender: 'Bob',
    recipient: 'Alice',
    amount: 50
});
console.log(myChain.chain);
console.log(`Atualmente a integridade da blockchain é: ${myChain.validateChain() ? 'válida' : 'inválida'}`);
