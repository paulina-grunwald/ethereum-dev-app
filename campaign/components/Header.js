import React from 'react'
import { Menu } from 'semantic-ui-react'

export default () => {
  return (
    <Menu style={{ marginTop: '10px', padding: '5px' }}>
      <a className='item'>CrowdCoin</a>
      <Menu.Menu position='right'>
        <span className='item'>Campaigns</span>
        <div>
          <button class='ui circular facebook icon button'>
            <i class='plus square outline icon'/>
          </button>
        </div>
      </Menu.Menu>
    </Menu>
  )
}