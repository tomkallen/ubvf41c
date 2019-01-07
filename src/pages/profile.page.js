import React, { Component } from 'react'
import { connect } from 'react-redux'
import "./pages.css"

class ProfilePage extends Component {
  render () {
    return (
      <div className={'Profile'}>Hi {this.props.user.user}</div>
    )
  }
}


const mapStateToProps = state => ({
  isLoggedIn: state.api.isLoggedIn,
  apiMessage: state.api.apiMessage,
  user: state.api.user
})

export default connect(mapStateToProps, null)(ProfilePage)
