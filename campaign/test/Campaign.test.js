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

  it('marks caller as the campain manager', async () => {
    const manager = await campaign.methods.manager().call()
    assert.strictEqual(accounts[0], manager)
  })
  it('allows people to contribute and marks them as approvers', async () => {
    await campaign.methods.contribute().send({
      value: '200',
      from: accounts[1]
    })
    const isContributor = await campaign.methods.approvers(accounts[1]).call()
    assert(isContributor)
  })
  it('check if the minimum contribution was added', async () => {
    try {
      await campaign.methods.contribute().send({
        value: '99',
        from: accounts[1]
      })
      assert(false)
    } catch (err) {
      assert(err)
    }
  })
  it('allows manager to make a request', async () => {
    await campaign.methods
      .createRequest('Buy cables', '1000', accounts[1])
      .send({ from: accounts[0], gas: '1000000' })
    const request = await campaign.methods.requests(0).call()
    assert.strictEqual('Buy cables', request.description)
  })
  it('processes request', async () => {
    await campaign.methods.contribute().send({
      from: accounts[0],
      value: web3.utils.toWei('10', 'ether')
    })
    await campaign.methods
      .createRequest('Buy batteries', web3.utils.toWei('5', 'ether'), accounts[1])
      .send({
        from: accounts[0],
        gas: '1000000'
      })
    await campaign.methods.approveRequest(0).send({
      from: accounts[0],
      gas: '1000000'

    })
    await campaign.methods.finalizeRequest(0).send({
      from: accounts[0],
      gas: '1000000'
    })
    let balance = await web3.eth.getBalance(accounts[1])
    balance = web3.utils.fromWei(balance, 'ether')
    balance = parseFloat(balance)
    assert(balance > 104)
  })
})
