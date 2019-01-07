const assert = require('assert')
const ganache = require('ganache-cli')
const Web3 = require('web3')
const web3 = new Web3(ganache.provider())

const compiledFactory = require('../ethereum/build/CampaignFactory.json')
const compiledCampaign = require('../ethereum/build/Campaign.json')

let accounts
let factory
let campaignAddress
let campaign

beforeEach(async () => {
  // Get list of accounts
  accounts = await web3.eth.getAccounts()
  // Create instance compiledFactory contract
  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    // Deploy instance of factory
    .deploy({ data: compiledFactory.bytecode })
    // Send transaction
    .send({ from: accounts[0], gas: '1000000' })
  // Use factory to create instance of campaign
  await factory.methods.createCampaign('100').send({
    from: accounts[0],
    gas: '1000000'
  });
  // Add address of newly created Campaign contract to camapignAddress variable
  [campaignAddress] = await factory.methods.getDeployedCampaigns().call()
  // Creates a new contract instance with all its methods and events
  // defined in its json interface object.
  campaign = await new web3.eth.Contract(
    JSON.parse(compiledCampaign.interface),
    campaignAddress
  )
})

describe('Campaigns', () => {
  it('deploys a factory and a campaign', () => {
    assert.ok(factory.options.address)
    assert.ok(campaign.options.address)
  })
})
