import web3 from './web3'

import CampaignFactory from './build/CampaignFactory.js'

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x68c44895CF8e3E9aAE4De9Ff16EeD1d6a90B3671'
)

export default instance
