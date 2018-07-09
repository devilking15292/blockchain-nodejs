const SHA256 = require('crypto-js/sha256')

class Block {
    constructor(data, index, previousHash, timestamp) {
        this.index = index;
        this.data = data;
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + this.data.toString() + this.nonce).toString();
    }
}

class BlockChain {
    constructor() {
        this.chain = [this.createGenesis()]
    }

    createGenesis() {
        return new Block("Genesis: where everything begins", 0, "0", new Date().getTime())
    }

    latestBlock() {
        return this.chain[this.chain.length - 1]
    }

    addBlock(data) {
        let newBlock = new Block(data, this.latestBlock().index+1, this.latestBlock().hash, new Date().getTime())
        newBlock.hash = newBlock.calculateHash()
        this.chain.push(newBlock)
    }

    checkValid() {
        for(let i=1;i<this.chain.length;i++) {
            const currentBlock = this.chain[i]
            const previousBlock = this.chain[i-1]
            
            if(currentBlock.hash !== currentBlock.calculateHash()) {
                return false
            }

            if(currentBlock.previousHash !== previousBlock.hash) {
                return false
            }
        }

        return true
    }
}


let chainOfBlocks = new BlockChain()

chainOfBlocks.addBlock({coins: 5})
chainOfBlocks.addBlock({coins: 10})
chainOfBlocks.addBlock({coins: 8})
chainOfBlocks.addBlock({coins: 19})

console.log(JSON.stringify(chainOfBlocks, null, 3))
console.log("Is blockchain valid? " + chainOfBlocks.checkValid())