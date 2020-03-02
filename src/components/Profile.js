import React, { useState } from 'react'
// import './App.css'
// import { Router } from '@reach/router'
// import PrivateRoute from './components/privateRoute'
// import Home from './components/Home'
// import LoginForm from './components/LoginForm'
import { Descriptions, Icon } from 'antd'

function Profile (props) {
  const { appState, setAppState } = props
  const { user } = appState

  return (<>
    <h1>Profile</h1>
    <h4>{appState.user.name}</h4>
    <Descriptions layout='vertical'>
      <Descriptions.Item label='Name'>{user.name}</Descriptions.Item>
      <Descriptions.Item label='Email'>
        {user.email}{' '}
        <Icon
          onClick={() =>
            setAppState({ ...appState, editEmailDrawerOpen: true })}
          type='edit'
        />
      </Descriptions.Item>
    </Descriptions>
          </>
  )
}

export default Profile
