import React from 'react'
import { Descriptions, Icon } from 'antd'

function Profile (props) {
  const { appState, setAppState } = props
  const { user } = appState

  return (
    <>
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
