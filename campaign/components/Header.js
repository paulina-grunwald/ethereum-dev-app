import React from 'react'
import { Menu } from 'semantic-ui-react'

export default () => {
  return (
    <Menu style={{ marginTop: '10px', padding: '5px' }}>
      <h1 className="animated fadeInRightBig delay-1s">CrowdCoin</h1>
      <Menu.Menu position='right'>
        <span className='item'>Campaigns</span>
        <div>
          <button className='ui circular facebook icon button'>
            <i className='plus square outline icon'/>
          </button>
        </div>
      </Menu.Menu>
    </Menu>
  )
}