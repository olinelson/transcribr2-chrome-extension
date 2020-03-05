
/* global chrome */
import React, { useState, useEffect } from 'react'
import './App.css'

import LoginForm from './components/LoginForm'

import YoutubeForm from './components/YoutubeForm'
import { Button, Tabs, Icon, Descriptions, Divider } from 'antd'

const { TabPane } = Tabs
function App () {
  const initialState = {
    user: {},
    token: null
  }

  const [appState, setAppState] = useState(initialState)
  const [activeKey, setActiveKey] = useState('1')
  useEffect(() => {
    chrome.storage.sync.get(['appState'], (res) => {
      setAppState({ ...appState, ...res.appState })
    })

    chrome.runtime.onMessage.addListener(
      (request, sender, sendResponse) => {
        if (request.name === 'refreshAppState') {
          chrome.storage.sync.get(['appState'], (res) => {
            setAppState({ ...appState, ...res.appState })
          })
        }
      })
  }, [appState])

  useEffect(() => {

  }, [])

  const handleLogout = async () => {
    chrome.runtime.sendMessage({ name: 'logout' })
  }

  if (typeof (appState.token) !== 'string') {
    return (
      <div style={{ margin: '.5rem' }}>
        <LoginForm />
      </div>
    )
  }

  return (
    <Tabs defaultActiveKey='1' style={{ margin: '.5rem' }}>

      <TabPane tab={<Icon type='youtube' />} key='1'>
        <YoutubeForm appState={appState} setAppState={setAppState} />
      </TabPane>

      <TabPane tab={<Icon type='user' />} key='2'>
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
}

export default App
