"use strict";
const Block = require('./Block');
const fs = require('fs');
module.exports = class Blockchain {
    constructor() {
        this.chain = [new Block()];
        this.nextIndex = 1;
    }
    // Método para retornar o hash do último bloco
    lastHash() {
        return this.chain[this.chain.length - 1].blockHash;
    }
    // Método para adicionar um bloco à blockchain
    addBlock(data) {
        const newBlock = new Block(this.nextIndex, data, this.lastHash(), '000');
        this.chain.push(newBlock);
        this.nextIndex++;
        this.saveBlockchain();
    }
    // Método para validar a blockchain
    validateChain() {
        for (let i = this.chain.length - 1; i > 0; i--) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];
            if (currentBlock.blockHash !== currentBlock.generateHash()
                || currentBlock.previousHash !== previousBlock.blockHash
                || currentBlock.blockNumber !== previousBlock.blockNumber + 1) {
                return false;
            }
        }
        return true;
    }
    // Método para salvar a blockchain em um arquivo
    saveBlockchain(filename = 'blockchain.json') {
        const jsonData = JSON.stringify(this.chain, null, 2);
        fs.writeFileSync(filename, jsonData, 'utf-8');
    }
    // Método para carregar a blockchain de um arquivo
    loadBlockchain(filename = 'blockchain.json') {
        if (fs.existsSync(filename)) {
            const jsonData = fs.readFileSync(filename, 'utf-8');
            if (!jsonData) {
                return;
            }
            const parsedData = JSON.parse(jsonData);
            this.chain = parsedData.map((blockData) => Object.assign(new Block(), blockData));
            this.nextIndex = this.chain.length;
        }
    }
};
