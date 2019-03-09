import React, { Component } from 'react'
import Layout from '../../components/Layout'
import { Button, Form, Input, Message } from 'semantic-ui-react'
import './new'
import factory from '../../ethereum/factory'
import web3 from '../../ethereum/web3'
import { Link, Router } from '../../routes'
class CampaignNew extends Component {
  state = {
    mimimumContribution: '',
    errorMessage: '',
    loading: false
  }

  addContribution = e => {
    this.setState({
      mimimumContribution: event.target.value
    })
  }

  onSubmit = async event => {
    event.preventDefault()
    this.setState({ loading: true, errorMessage: '' })
    try {
      const accounts = await web3.eth.getAccounts()
      await factory.methods
        .createCampaign(this.state.minimumContribution)
        .send({
          from: accounts[0]
        })
      Router.pushRoute('/')
    } catch (err) {
      this.setState({ errorMessage: err.message })
    }
    this.setState({ loading: false })
  }

  render () {
    return (
      <Layout>
        <h2>New campaign</h2>
        <Form
          onSubmit={this.onSubmit}
          error={!!this.state.errorMessage}
          error={!!this.state.errorMessage}
        >
          <Form.Field>
            <label>Minimum Contribution</label>
            <Input
              type='number'
              label='wei'
              labelPosition='right'
              value={this.state.minimumContribution}
              onChange={event =>
                this.setState({ minimumContribution: event.target.value })
              }
            />
          </Form.Field>
          <Message error header='Oops' content={this.state.errorMessage} />
          <Button loading={this.state.loading} primary>
            Create!
          </Button>
        </Form>
      </Layout>
    )
  }
}
export default CampaignNew
