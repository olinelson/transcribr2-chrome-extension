/* global chrome */
import React, { useEffect, useState } from 'react'
import { Form, Icon, Input, Button } from 'antd'

export const getToken = async () => {
  try {
    const res = await chrome.storage.sync.get(['token'])
    const token = res.token

    return token
  } catch (error) {
    return false
  }
}

function YoutubeForm (props) {
  const loading = props.appState.youtubeUploading || false
  const [currentURL, setCurrentURL] = useState('')

  useEffect(() => {
    const getCurrentURL = (tab) => {
      setCurrentURL(tab)
    }

    chrome.tabs.query({ active: true, windowId: chrome.windows.WINDOW_ID_CURRENT },
      (tabs) => {
        getCurrentURL(tabs[0].url)
      })
  }, [props.appState])

  const handleSubmit = (e) => {
    e.preventDefault()
    props.setAppState({ ...props.appState, youtubeUploading: true })
    const url = e.target.url.value
    chrome.runtime.sendMessage({ name: 'createYoutubeClip', url, appState: props.appState }, (response) => {
    })
  }

  return (
    <>
      {/* <h1>Add Youtube Clip</h1> */}
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Form.Item>

          <Input

            onChange={(e) => setCurrentURL(e.target.value)}
            disabled={loading}
            value={currentURL}
            className='url'
            name='url'
            type='url'
            prefix={<Icon type='link' style={{ color: 'rgba(0,0,0,.25)' }} />}
            rules={[{
              required: true,
              message: 'Please enter a youtube url'
            }]}
          />
                    )}
        </Form.Item>

        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            loading={loading}
            disabled={loading}
          >
                       Upload
          </Button>
        </Form.Item>
      </Form>
    </>)
}

export default YoutubeForm
