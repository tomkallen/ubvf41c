import { START_FETCH, END_FETCH, SET_LOGIN } from '../actions/actionTypes'

const api = (state = {}, action) => {
  switch (action.type) {
    case START_FETCH: {
      return {...state, isAPIFetching: true, apiMessage: action.payload.message}
    }
    case END_FETCH: {
      return {...state, isAPIFetching: false, apiMessage: action.payload.message}
    }
    case SET_LOGIN: {
      return {...state, isLoggedIn: true, user: action.payload}
    }
    default: {
      return state
    }
  }
}

export default api
