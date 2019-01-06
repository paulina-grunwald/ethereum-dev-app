const path = require('path')
const solc = require('solc')
const fs = require('fs-extra')

// Check if the build folder exists
const buildPath = path.resolve(__dirname, 'build')
// Delete entire 'build' folder if exists
fs.removeSync(buildPath)
// Read Campaign.sol from contracts folder
const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol')
const source = fs.readFileSync(campaignPath, 'utf8')
// Compile CampaignFactory and Campaign contracts with solidity compiler
const output = solc.compile(source, 1).contracts
// Create 'build' folder if it doesn't exist
fs.ensureDirSync(buildPath)
// Write output to the 'build' directory

for (let contract in output) {
  fs.outputJsonSync(
    path.resolve(buildPath, contract.replace(':', '') + '.json'),
    output[contract]
  )
}
