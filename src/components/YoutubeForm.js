/* global chrome */
import React from "react"
import { Form, Icon, Input, Button, Checkbox } from "antd"
import { openNotificationWithIcon } from "./Notifications"
import { navigate, Link } from "@reach/router"
import {API_URL} from '../utils/config'


export const getToken = async () => {
    console.log('getting token')
    try {
        const res = await chrome.storage.sync.get(['token'])
        const token = res.token
        console.log('res', res)
        console.log('token', token)

        return token
    } catch (error) {
        return false
    }
}


class YoutubeForm extends React.Component {


    state = {
        loading: this.props.appState.youtubeUploading || false,
        currentURL: ""
    }

    componentDidMount(){

        chrome.tabs.query({ active: true, windowId: chrome.windows.WINDOW_ID_CURRENT },
             (tabs) => {
                getCurrentURL(tabs[0].url)
            })

        const getCurrentURL = (tab)  => {
            this.setState({ ...this.state, currentURL: tab })
        }
    }



    handleSubmit =  async  (e) => {
        e.preventDefault()
                try {
                    this.setState({...this.state, loading: true })
                    // openNotificationWithIcon('success', "Youtube download started!")
                    this.props.setAppState({ ...this.props.appState, youtubeUploading: true })
                    const res = await fetch(API_URL + '/youtube', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: this.props.appState.token
                        },
                        body: JSON.stringify({
                            url: e.target.url.value
                        })
                    })
                    if (!res.ok) throw new Error('Invalid url')
                    const clip = await res.json()

                     // parses JSON response into native JavaScript objects
                    openNotificationWithIcon('success', `${clip.name} created!`)
                    this.props.setAppState({ ...this.props.appState})
                } catch (error) {
                    console.error(error)
                    openNotificationWithIcon('error', 'Coudn\'t create clip, please try again')
                    this.setState({...this.state,loading: false})
                    this.props.setAppState({ ...this.props.appState, youtubeUploading: false,})
                    // setClip({ ...clip, saving: false, editClipDrawerOpen: false })
                }

            this.setState({...this.state, loading: false })

    }

   

    render() {
        console.log('current URL', this.state.currentURL)

       
        return (
            <>
            <h1>Add Youtube Clip</h1>
            <Form onSubmit={this.handleSubmit} >
                <Form.Item>

                        <Input
                            onChange={(e) => this.setState({...this.state, currentURL: e.target.value})}
                            disabled={this.state.loading}
                            value={this.state.currentURL}
                            className="url"
                            name="url"
                            type="url"
                            prefix={<Icon type="link" style={{ color: "rgba(0,0,0,.25)" }} />}
                            // placeholder="https://www.youtube.com/watch?v=96n33WWgE9g"
                            rules={[{
                                required: true,
                                message: 'Please enter a youtube url',
                            }]}
                        />
                    )}
                </Form.Item>
               
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={this.state.loading}
                        disabled={this.state.loading}
                    >
                       Upload
          </Button>
                </Form.Item>
            </Form>
        </>)
    }
}


export default YoutubeForm
