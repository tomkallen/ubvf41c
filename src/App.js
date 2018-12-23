import React, { Component } from 'react'
import './App.css'
import { login, checkLogin } from './redux/actions/api.action'
import { connect } from 'react-redux'

class App extends Component {

  state = {username: '', password: '', currentUser: '', error: ''}

  handleChange = (event, field) => {
    this.setState({[field]: event.target.value})
  }

  handleSubmit = () => {
    const {username, password} = this.state
    this.props.login({username, password})
  }

  componentDidMount () {
    this.props.checkLogin()
  }

  render () {
    return (
      <div className="App">
        <div>
          <input type="text" onChange={e => this.handleChange(e, 'username')} value={this.state.username}/>
          <input type="text" onChange={e => this.handleChange(e, 'password')} value={this.state.password}/>
          <button onClick={this.handleSubmit}>Submit</button>
          <br/>
          {this.props.isLoggedIn ? <p>Hello {this.props.user.user}</p> : null}
          {this.props.apiMessage ? <p>{this.props.apiMessage}</p> : null}
        </div>
      </div>
    )
  }
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
