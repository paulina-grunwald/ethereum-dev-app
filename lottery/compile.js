const path = require('path')
const fs = require('fs')
const solc = require('solc')

// Get path of the Inbox.sol file
const lotteryPath = path.resolve(__dirname, 'contracts', 'Lottery.sol')
// Read content of the file
const source = fs.readFileSync(lotteryPath, 'utf8')

module.exports = solc.compile(source, 1).contracts[':Lottery']
