const path = require('path')
const fs = require('fs')
const solc = require('solc')

// Get path of the Inbox.sol file
const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol')
// Read content of the file
const source = fs.readFileSync(inboxPath, 'utf8')

module.exports = solc.compile(source, 1).contracts[':Inbox']
