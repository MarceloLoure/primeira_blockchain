"use strict";
const Blockchain = require('./classes/Blockchain');
// Instanciando a classe Blockchain
const myChain = new Blockchain();
// Carregando a blockchain
myChain.loadBlockchain();
// Adicionando blocos
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
// Mostrando a blockchain e validando
console.log(myChain.chain);
console.log(`Atualmente a integridade da blockchain é: ${myChain.validateChain() ? 'válida' : 'inválida'}`);
