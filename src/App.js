import React, { Component } from 'react'
import './App.css'
import LeftMenu from './components/leftMenu/leftMenu.component'
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
          <LeftMenu/>
          <Route exact path={'/'} component={ProfilePage}/>
          <Route path={'/login'} component={Login}/>
          <PrivateRoute path={'/profile'} component={ProfilePage} {...this.props}/>
        </div>
      </Router>
    )
  }
}

function PrivateRoute ({component: Component, ...rest}) {
  console.log(rest)
  return (
    <Route
      {...rest}
      render={props => rest.isLoggedIn
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
      }
    />
  )
}

const mapDispatchToProps = (dispatch) => ({
  login: (data) => dispatch(login(data)),
  checkLogin: () => dispatch(checkLogin())
})

const mapStateToProps = state => ({
  isLoggedIn: state.api.isLoggedIn,
  apiMessage: state.api.apiMessage,
  user: state.api.user
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
