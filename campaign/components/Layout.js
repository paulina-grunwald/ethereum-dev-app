import React from 'react'
import Header from './Header'
import Head from 'next/head'
export default function (props) {
  return (
    <div className='ui container'>
      <Head>
        <link
          rel='stylesheet'
          href='//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css'
        />
        <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css'/>
      </Head>
      <Header />
      {props.children}
      <h1>I am a footer</h1>
    </div>
  )
}
