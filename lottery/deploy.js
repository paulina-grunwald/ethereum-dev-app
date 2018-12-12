const HDWalletProvider = require('truffle-hdwallet-provider')
const Web3 = require('web3')
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
  'rebuild found wife unhappy any budget prefer forest auto delay sudden play',
  'https://rinkeby.infura.io/v3/ed69e36802b2498498263324c315c180'

)
const web3 = new Web3(provider)

const deploy = async()=> {
  accounts = await web3.eth.getAccounts();
  console.log('Attempt to deploy on account:', accounts[0])

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data: bytecode})
    .send({gas: '1000000', from: accounts[0]})
  
  console.log('Address of deployed contract:', result.options.address)
}

deploy()