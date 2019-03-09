import React from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from '../routes' 

export default () => {
  return (
    <Menu style={{ marginTop: '10px', padding: '5px' }}>
      <Link route='/'>CrowdCoin</Link>
      <Menu.Menu position='right'>
        <div>
          <Link route='/'>
            <a>Campaigns</a>
          </Link>
          <Link route='/campaigns/new'>
            <button className='ui circular facebook icon button'>
              <i className='plus square outline icon' />
            </button>
          </Link>
        </div>
      </Menu.Menu>
    </Menu>
  )
}