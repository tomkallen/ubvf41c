import React, { Component } from 'react'
import { connect } from 'react-redux'
import { checkLogin, login } from '../redux/actions/api.action'
import { Redirect } from 'react-router-dom'

class Login extends Component {

  state = {username: '', password: '', currentUser: '', error: ''}

  handleChange = (event, field) => {
    this.setState({[field]: event.target.value})
  }

  handleSubmit = () => {
    const {username, password} = this.state
    this.props.login({username, password})
  }

  // componentDidMount () {
  //   this.props.checkLogin()
  // }

  render () {
    console.log(this.props.location)
    if (this.props.isLoggedIn) return <Redirect to={{pathname: this.props.location.state.from.pathname}}/>
    return (
      <div className={'Login'}>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login)
