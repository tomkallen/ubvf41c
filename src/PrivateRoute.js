import { Redirect, Route } from 'react-router-dom'
import React from 'react'

export function PrivateRoute ({component: Component, ...rest}) {
  return (
    <Route
      {...rest}
      render={props => rest.isLoggedIn
        ? <Component {...props} />
        : <Redirect to={{pathname: '/', state: {from: props.location}}}/>
      }
    />
  )
}