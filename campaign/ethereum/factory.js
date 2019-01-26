import web3 from './web3'
import CampaignFactory from './build/CampaignFactory.json'

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x3AC72a8874b77FD8EF8f061CF2c5cdb5f2b4b648'
)

export default instance
