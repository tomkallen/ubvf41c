import React, { Component } from 'react'
import { connect } from 'react-redux'
import { checkLogin, login } from '../redux/actions/api.action'
import { Redirect } from 'react-router-dom'

class Login extends Component {

  state = {username: '', password: '', currentUser: '', error: ''}

  handleChange = (event, field) => this.setState({[field]: event.target.value})

  handleSubmit = () => {
    if (this.props.isLoading) return
    const {username, password} = this.state
    this.props.login({username, password})
  }

  render () {
    if (this.props.isLoggedIn) return <Redirect to={'/dash'}/>
    return (
      <div className={'Login'}>
        <div className={'Login-box'}>
          {this.props.apiMessage ? <div className={'Login-toast'}>{this.props.apiMessage}</div> : null}
          <input placeholder={'login'} type="text" onChange={e => this.handleChange(e, 'username')}
                 value={this.state.username}/>
          <input placeholder={'password'} type="password" onChange={e => this.handleChange(e, 'password')}
                 value={this.state.password}/>
          <div className={'button'} onClick={this.handleSubmit}>Submit</div>
          <p>Or click <span className="button">this button</span> to create a new account</p>
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
  isLoading: state.api.isAPIFetching,
  apiMessage: state.api.apiMessage,
  user: state.api.user
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
