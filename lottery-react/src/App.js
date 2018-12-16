import React, { Component } from 'react'
import './App.css'
import web3 from './web3'
import lottery from './lottery'
import { throws } from 'assert'
class App extends Component {
  state = {
    manager: '',
    players: [],
    balance: '',
    value: ''
  }

  async componentDidMount() {
    const manager = await lottery.methods.manager().call()
    this.setState({ manager })
    const players = await lottery.methods.getPlayers()
    const balance = await web3.eth.getBalance.request(lottery.options.address)
  }

  onSubmit = async event => {
    event.preventDefault()
    const accounts = await web3.eth.getAccounts()
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, 'ether')
    })
  }
  render() {
    web3.eth.getAccounts().then(console.log)
    return (
      <div className="App">
        <h2>Lottery Contract</h2>
        <p>
          This contract is managed by <b>{this.state.manager}</b>!
        </p>
        <p>
          There are currently {this.state.players.length} competing to win{' '}
          {web3.utils.fromWei(this.state.balance, 'ether')} ether!
        </p>

        <form onSubmit={this.onSubmit}>
          <div className="title">Do you want to win the lottery?</div>
          <div>
            <label>Amount of ether to enter</label>
            <input
              value={this.state.value}
              onChange={event => this.setState({ value: event.target.value })}
            />
          </div>
          <button>Enter lottery</button>
        </form>
      </div>
    )
  }
}

export default App
