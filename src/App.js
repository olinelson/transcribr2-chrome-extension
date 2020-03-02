
/* global chrome */
import React, { useState, useEffect } from 'react'
import './App.css'
import { Router } from '@reach/router'
import { API_URL } from './utils/config'
// import PrivateRoute from './components/privateRoute'
import Home from './components/Home'
import LoginForm from './components/LoginForm'
import Profile from './components/Profile'
import { useStateWithLocalStorageJSON, isLoggedIn, getUser, logout } from './utils/auth'
import YoutubeForm from './components/YoutubeForm'
import { Menu, Button, Tabs, Icon, Descriptions, Divider } from 'antd'
import { changeConfirmLocale } from 'antd/lib/modal/locale'
const { TabPane } = Tabs
function App () {
  const initialState = {
    user: {},
    token: null
  }

  const [appState, setAppState] = useState(initialState)

  useEffect(() => {
    // getUser()
    chrome.storage.sync.get(['appState'], (res) => {
      console.log(res)
      setAppState({ ...appState, ...res.appState })
    })
  }, [])

  useEffect(() => {

  }, [appState])

  const handleLogin = async ({ email, password }) => {
    try {
      let res = await fetch(API_URL + '/users/login', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client
        body: JSON.stringify({ email, password }) // body data type must match "Content-Type" header
      })

      res = await res.json() // parses JSON response into native JavaScript objects
      // await setUserAndToken(res)
      chrome.storage.sync.set({ appState: { user: res.user, token: 'Bearer ' + res.token } })
      setAppState({ ...appState, user: res.user, token: 'Bearer ' + res.token })
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }

  const handleLogout = async () => {
    chrome.storage.sync.clear()
    setAppState({ ...appState, ...initialState })
  }

  console.log('appState', appState)

  if (typeof (appState.token) !== 'string') {
    return <div style={{ margin: '.5rem' }}>
      <LoginForm handleLogin={handleLogin} />
    </div>
  }

  return (
    <Tabs defaultActiveKey='1' style={{ margin: '.5rem' }}>
      <TabPane tab={<Icon type='youtube' />} key='2'>
        <YoutubeForm appState={appState} setAppState={setAppState} />
      </TabPane>
      <TabPane tab={<Icon type='user' />} key='3'>
        <Descriptions>
          <Descriptions.Item label='Name'>{appState.user.name || null}</Descriptions.Item>
          <Descriptions.Item label='Email'>
            {appState.user.email || null}
          </Descriptions.Item>
        </Descriptions>
        <Divider />
        <Button icon='logout' onClick={() => handleLogout()}>Log out</Button>
      </TabPane>

    </Tabs>
  )

  // return <LoginForm />
}

export default App
