"use strict";
const sha256 = require('crypto-js/sha256');
module.exports = class Block {
    constructor(blockNumber = 0, data = 'Genesis Block', previousHash = null, difficulty = '') {
        this.blockNumber = blockNumber;
        this.data = data;
        this.timestamp = (new Date()).toISOString();
        this.nonce = 0;
        this.previousHash = previousHash;
        this.mineBlock(difficulty);
    }
    // Método para gerar o hash do bloco
    generateHash() {
        return sha256(this.blockNumber + JSON.stringify(this.data) + this.timestamp + this.previousHash + this.nonce).toString();
    }
    // Método para minerar o bloco
    mineBlock(prefix) {
        var _a;
        do {
            this.nonce++;
            this.blockHash = this.generateHash();
        } while (!((_a = this.blockHash) === null || _a === void 0 ? void 0 : _a.startsWith(prefix)));
    }
};
