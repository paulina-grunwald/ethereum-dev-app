import React, { Component } from 'react'
import factory from '../ethereum/factory'

class CampaignIndex extends Component {
  async componentDidMount () {
    // retireve array of deployed campaigns
    const campaigns = await factory.methods.getDeployedCampaigns().call()
    console.log('campaigns', campaigns)
  }
  render () {
    return (
      <div>
        Campaigns
      </div>
    )
  }
}

export default CampaignIndex
