import * as CryptoJs from "crypto-js";

class Block {
  public index: number;
  public hash: string;
  public previousHash: string;
  public data: string;
  public timestemp: number;

  static calculateBlockHash = (
    index: number,
    previousHash: string,
    timestemp: number,
    data: string
  ): string =>
    CryptoJs.SHA256(index + previousHash + timestemp + data).toString();

  static vaildBlockStructure = (block: Block): boolean =>
    typeof block.index === "number" &&
    typeof block.hash === "string" &&
    typeof block.data === "string" &&
    typeof block.previousHash === "string" &&
    typeof block.timestemp === "number";

  constructor(
    index: number,
    hash: string,
    previousHash: string,
    data: string,
    timestemp: number
  ) {
    this.index = index;
    this.hash = hash;
    this.previousHash = previousHash;
    this.data = data;
    this.timestemp = timestemp;
  }
}
const genesisBlock: Block = new Block(0, "34431341324", "", "날짜", 123456); //index체인

let blockchain: Block[] = [genesisBlock];

const getBlockchain = (): Block[] => blockchain;

const getLatestBlock = (): Block => blockchain[blockchain.length - 1];

const getNewTimeStemp = (): number => Math.round(new Date().getTime() / 1000);

const creatBlock = (data: string): void => {
  const previousBlock: Block = getLatestBlock();
  const newIndex: number = previousBlock.index + 1;
  const newTimestemp: number = getNewTimeStemp();

  const newHash: string = Block.calculateBlockHash(
    newIndex,
    previousBlock.hash,
    newTimestemp,
    data
  );
  //위의 정보로 예비블럭 생성후 반환
  const candidateBlock: Block = new Block(
    newIndex,
    newHash,
    previousBlock.hash,
    data,
    newTimestemp
  );

  //예비브럭과 이전블럭의 관계를 확인합니다
  const isBlockVaild = (
    candidateBlock: Block,
    previousBlock: Block
  ): boolean => {
    const getHashForBlock = (block: Block): string =>
      Block.calculateBlockHash(
        block.index,
        block.previousHash,
        block.timestemp,
        block.data
      );
    if (!Block.vaildBlockStructure(candidateBlock)) {
      return false;
    } else if (candidateBlock.index !== previousBlock.index + 1) {
      return false;
    } else if (candidateBlock.previousHash !== previousBlock.hash) {
      return false;
    } else if (getHashForBlock(candidateBlock) !== candidateBlock.hash) {
      return false;
    } else {
      return true;
    }
  };
  if (isBlockVaild(candidateBlock, previousBlock)) {
    blockchain.push(candidateBlock);
  }
};

console.log(blockchain);
export {};
