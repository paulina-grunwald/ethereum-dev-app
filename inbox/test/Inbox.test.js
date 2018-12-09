const assert = require('assert')
const ganache = require('ganache-cli')
const Web3 = require('web3')
// Create instance of web3 and connect it to local test network hosted on my machine
const provider = ganache.provider();
const web3 = new Web3(provider);

const { interface, bytecode } = require('../compile');

let accounts;
let inbox;

beforeEach(async () => {
  // Get a list of all accounts from Ganache local test network
  // The web3-eth is for the ethereum blockchain and smart contracts
  accounts = await web3.eth.getAccounts();
    
    // Use one of those accounts to deploy the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
      // deploy contract
      .deploy({data: bytecode, arguments: ['Hi there!']})
      // send from first account in the local test network
      .send({ from: accounts[0], gas: '1000000' });
});
    
describe('Inbox', () => {
  it('deploys a contract and checks if address is assign', () => {
    assert.ok(typeof inbox.options.address==='string');
  });

});
