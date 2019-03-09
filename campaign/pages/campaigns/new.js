import React, { Component } from 'react'
import Layout from '../../components/Layout'
import { Button, Form, Input } from 'semantic-ui-react'
import './new'
import factory from '../../ethereum/factory'
import web3 from '../../ethereum/web3'
class CampaignNew extends Component {
  state = {
     mimimumContribution: ''
  }

  addContribution =  (e)=> {
    this.setState({
      mimimumContribution: event.target.value
    })
  }

  onSubmit = async event => {
    event.preventDefault();
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createCampaign(this.state.minimumContribution)
        .send({
          from: accounts[0]
        })
  }

  
  render() {
    return (
      <Layout>
        <h2>
          New campaign
        </h2>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Minimum Contribution</label>
            <Input
              type='number'
              label="wei"
              labelPosition="right"
              value={this.state.minimumContribution}
              onChange={event => this.setState({ minimumContribution: event.target.value })}
            />
          </Form.Field>
          <Button primary>
            Create!
          </Button>
        </Form>
      </Layout>
    )
  }
}
export default CampaignNew
 