import web3 from './web3'

import CampaignFactory from './build/CampaignFactory.js'

const instance = new web3.eth.Contracts(
  JSON.parse(CampaignFactory.interface),
  ''
)

export default instance
