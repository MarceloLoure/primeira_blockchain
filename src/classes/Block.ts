const sha256 = require('crypto-js/sha256');

module.exports = class Block {
    blockNumber: number;
    data: string;
    timestamp: string;
    nonce: number;
    previousHash: string | null;
    blockHash: string | undefined;

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
    mineBlock(prefix: any) {
        do {
            this.nonce++
            this.blockHash = this.generateHash();

        } while (!this.blockHash?.startsWith(prefix));
    }
}