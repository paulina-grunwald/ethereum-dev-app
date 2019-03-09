import React, { Component } from 'react'
import factory from '../ethereum/factory'
import { Card, Button } from 'semantic-ui-react'
import Layout from '../components/Layout'
class CampaignIndex extends Component {
  // lifecycle methods from next.js like componentDidMount
  static async getInitialProps () {
    const campaigns = await factory.methods.getDeployedCampaigns().call()
    return { campaigns }
  }
  renderCampaigns () {
    const items = this.props.campaigns.map(address => {
      return {
        header: address,
        description: 'test',
        fluid: true
      }
    })
    return <Card.Group items={items} />
  }
  render () {
    return (
      
      <Layout>
        <h3>Open Campaigns</h3>
        <Button floated='right'
          content='Create Campaign'
          icon='add circle'
          primary
        />
        {this.renderCampaigns()}
      </Layout>
    )
  }
}

export default CampaignIndex
