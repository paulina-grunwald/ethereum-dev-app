import React, { Component } from 'react'
import { Form, Button, Message, Input } from 'semantic-ui-react'
import Campaign from '../../../ethereum/campaign'
import web3 from '../../../ethereum/web3'
import { Link, Router } from '../../../routes'
import Layout from '../../../components/Layout'
export default class RequestNew extends Component {
  state = {
    value: '',
    description: '',
    recipient: ''
  }
  render() {
    return (
      <Layout>
        <Form>
          <Form.Field>
            <label>Description</label>
            <Input onChange={e=> this.setState({description: event.target.value})}/>
          </Form.Field>
          <Form.Field>
            <label>Value in Ether</label>
            <Input onChange={e => this.setState({ value: event.target.value })} />
          </Form.Field>
          <Form.Field>
            <label>Recipient</label>
            <Input onChange={e => this.setState({ recipient: event.target.value })} />
          </Form.Field>
          <Button primary>Create</Button>
        </Form>
      </Layout>
    )
  }
}
