import React from 'react'
import { Menu, Button } from 'semantic-ui-react'
import { Link } from '../routes'

export default () => {
  return (
    <Menu style={{ marginTop: '10px' }}>
      <Link route="/">
        <a className="item" style={{ fontSize: '19px', fontStyle: 'bold' }}>
          BlockChain Campaign App
        </a>
      </Link>

      <Menu.Menu position="right">
        <Link route="/">
          <a className="item" style={{ fontSize: '19px', fontStyle: 'bold' }}>
            Campaigns
          </a>
        </Link>
        <Link route="/campaigns/new">
          <a
            style={{
              padding: '5px',
              display: 'flex',
              'align-items': 'center',
              'justify-content': 'center'
            }}
          >
            <Button className="ui circular  icon button primary">
              <i className="plus square outline icon" />
            </Button>
          </a>
        </Link>
      </Menu.Menu>
    </Menu>
  )
}
