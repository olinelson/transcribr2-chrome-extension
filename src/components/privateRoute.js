import React from 'react'
import { navigate } from '@reach/router'

// import { navigate } from 'gatsby'
import { isLoggedIn, isBrowser } from '../utils/auth'

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  if (!isLoggedIn() && location.pathname !== '/login') {
    if (isBrowser()) {
      navigate('/login')
    }

    return null
  }

  return <Component {...rest} />
}

export default PrivateRoute
