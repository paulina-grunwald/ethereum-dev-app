import React from 'react'
import Header from './Header'

export default function (props) {
  return (
    <div class="ui container">
      <Header />
      {props.children}
      <h1>I am a footer</h1>
    </div>
  )
}
