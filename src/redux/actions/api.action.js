import { START_FETCH, END_FETCH, SET_LOGIN } from './actionTypes'

import API from '../../api/auth.api'

export const startFetch = (message = '') => ({
  type: START_FETCH,
  payload: {message}
})

export const endFetch = (message = '') => ({
  type: END_FETCH,
  payload: {message}
})

const setLoginState = user => ({
  type: SET_LOGIN,
  payload: user
})

export const login = (payload) => {
  return (dispatch, getState) => {
    if (getState().api.isLoggedIn) return
    dispatch(startFetch())
    API.login(payload)
      .then((user) => {
        dispatch(endFetch())
        dispatch(setLoginState(user))
      })
      .catch(() => dispatch(endFetch('Incorrect username or password')))
  }
}

export const checkLogin = () => {
  return (dispatch, getState) => {
    if (getState().api.isLoggedIn) return
    dispatch(startFetch())
    API.checkLogin()
      .then((res) => {
        dispatch(endFetch())
        dispatch(setLoginState({user: res.user.username}))
      })
      .catch(() => dispatch(endFetch()))
  }
}