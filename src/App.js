import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import axios from 'axios'

class App extends Component {

  state = {username: '', password: '', currentUser: '', error: ''}

  handleChange = (event, field) => {
    this.setState({[field]: event.target.value})
  }

  handleSubmit = () => {
    const {username, password} = this.state
    axios.post('/api/user/login', {username, password})
      .then(res => this.setState({currentUser: res.data.user, error: ''}))
      .catch(() => this.setState({error: 'Invalid login', currentUser: ''}))
  }

  render () {
    return (
      <div className="App">
        <div>
          <input type="text" onChange={e => this.handleChange(e, 'username')} value={this.state.username}/>
          <input type="text" onChange={e => this.handleChange(e, 'password')} value={this.state.password}/>
          <button onClick={this.handleSubmit}>Submit</button>
          <br/>
          {this.state.currentUser ? <p>Hello {this.state.currentUser}</p> : null}
          {this.state.error ? <p>{this.state.error}</p> : null}
        </div>
      </div>
    )
  }
}

export default App
