"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CryptoJs = require("crypto-js");
class Block {
    constructor(index, hash, previousHash, data, timestemp) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestemp = timestemp;
    }
}
Block.calculateBlockHash = (index, previousHash, timestemp, data) => CryptoJs.SHA256(index + previousHash + timestemp + data).toString();
Block.vaildBlockStructure = (block) => typeof block.index === "number" &&
    typeof block.hash === "string" &&
    typeof block.data === "string" &&
    typeof block.previousHash === "string" &&
    typeof block.timestemp === "number";
const genesisBlock = new Block(0, "34431341324", "", "날짜", 123456); //index체인
let blockchain = [genesisBlock];
const getBlockchain = () => blockchain;
const getLatestBlock = () => blockchain[blockchain.length - 1];
const getNewTimeStemp = () => Math.round(new Date().getTime() / 1000);
const creatBlock = (data) => {
    const previousBlock = getLatestBlock();
    const newIndex = previousBlock.index + 1;
    const newTimestemp = getNewTimeStemp();
    const newHash = Block.calculateBlockHash(newIndex, previousBlock.hash, newTimestemp, data);
    //위의 정보로 예비블럭 생성후 반환
    const candidateBlock = new Block(newIndex, newHash, previousBlock.hash, data, newTimestemp);
    //예비브럭과 이전블럭의 관계를 확인합니다
    const isBlockVaild = (candidateBlock, previousBlock) => {
        const getHashForBlock = (block) => Block.calculateBlockHash(block.index, block.previousHash, block.timestemp, block.data);
        if (!Block.vaildBlockStructure(candidateBlock)) {
            return false;
        }
        else if (candidateBlock.index !== previousBlock.index + 1) {
            return false;
        }
        else if (candidateBlock.previousHash !== previousBlock.hash) {
            return false;
        }
        else if (getHashForBlock(candidateBlock) !== candidateBlock.hash) {
            return false;
        }
        else {
            return true;
        }
    };
    if (isBlockVaild(candidateBlock, previousBlock)) {
        blockchain.push(candidateBlock);
    }
};
console.log(blockchain);
//# sourceMappingURL=index.js.map