import Web3 from 'web3'

let web3

if (typeof window !== 'undefined' && typeof window.web !== 'undefined') {
  // We are in the browser
  // create instance of Web3 - get access to Metamask
  web3 = new Web3(window.web3.currentProvider)
} else {
  // We are on the server
  const provider = new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/v3/ed69e36802b2498498263324c315c180'

  )
  web3 = new Web3(provider)
}

export default web3
