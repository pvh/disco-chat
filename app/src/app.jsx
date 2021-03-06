'use strict'

import React from 'react/addons'
import FluxComponent from 'flummox/component'
import { RouteHandler } from 'react-router'
import _ from 'lodash'


class App extends React.Component {

  constructor(props, context) {
    super(props)

    if (!_.isEmpty(props.account)) {
      this.state = { authenticated: true, loading: false }
      return
    }

    this.state = { authenticated: false, loading: true }

    let userKey = context.router.getCurrentParams().userKey
    let number  =  context.router.getCurrentQuery().number

    if (!userKey && !number) {
      userKey = localStorage.getItem('userKey')
      number = localStorage.getItem('number')
    }

    if (userKey && number) {
      props.flux
        .getActions('account')
        .setCurrentAcct(userKey, number)
    }
  }

  componentWillReceiveProps(props, context) {
    if (!_.isEmpty(props.account)) {
      this.state = { authenticated: true, loading: false }
    }
  }

  render () {
    if (!this.state.authenticated) {
      return (
        <div className='main container login'>
          <div className="logo">
            <img src="images/disco-chat-logo.png" alt="Smiley face" align="middle"/>
            <h1><strong>Disco</strong>Chat</h1>
            <p>Your Party Built this Playlist</p>
          </div>
          <a href="/api/auth" className='button'>Get started!</a>
        </div>
      )
    }

    return (
      <div className='main container'>
        <RouteHandler />
      </div>
    )
  }
}

App.contextTypes = {
    router: React.PropTypes.func.isRequired
}

module.exports = App
