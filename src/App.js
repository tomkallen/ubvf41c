import React, { Component } from 'react'
import './App.css'
import Login from './pages/login.page'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import ProfilePage from './pages/profile.page'
import { connect } from 'react-redux'
import { checkLogin, login } from './redux/actions/api.action'

class App extends Component {
  componentDidMount () {
    this.props.checkLogin()
  }

  render () {
    return (
      <Router>
        <div className="App">
          <Route exact path={'/'} component={Login}/>
          <PrivateRoute path={'/dash'} component={ProfilePage} {...this.props}/>
        </div>
      </Router>
    )
  }
}

function PrivateRoute ({component: Component, ...rest}) {
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

const mapDispatchToProps = (dispatch) => ({
  login: (data) => dispatch(login(data)),
  checkLogin: () => dispatch(checkLogin())
})

const mapStateToProps = (state) => ({
  isLoggedIn: state.api.isLoggedIn,
  apiMessage: state.api.apiMessage,
  user: state.api.user
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
