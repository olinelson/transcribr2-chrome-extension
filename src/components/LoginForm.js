/* global chrome */
import React from "react"
import { Form, Icon, Input, Button,  } from "antd"

class Login extends React.Component {
  state = {
    loading: false,
  }

  handleSubmit = e => {
    this.setState({ loading: true })

    e.preventDefault()
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        chrome.runtime.sendMessage({ name: 'login', ...values })
      }
      this.setState({ loading: false })
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <>
      <Form onSubmit={this.handleSubmit} className="login-form">
        <h1>Login</h1>
        <Form.Item>
          {getFieldDecorator("email", {
            rules: [{ required: true, message: "Please input your email!" }],
          })(
            <Input
              type="email"
              prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Email"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Please input your Password!" }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </Form.Item >

            <div style={{display: 'flex', flexDirection: 'column'}}>
            <Button style={{alignSelf: 'start'}} size="small" type="link" className="login-form-forgot" onClick={() => chrome.tabs.create({ url: 'https://transcribrapp.com/forgot' })}>
              Forgot password
          </Button>
          
         
          <Button
            width="100%"
            type="primary"
            htmlType="submit"
            className="login-form-button"
            loading={this.state.loading}
          >
            Log in
            </Button>
         
            <Button style={{ alignSelf: 'start' }} size="small" type="link" onClick={() => chrome.tabs.create({ url: 'https://transcribrapp.com/signup' })}>Sign Up</Button>
          </div>         
      </Form>

      </>
    )
  }
}

const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(Login)

export default WrappedNormalLoginForm
