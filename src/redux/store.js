import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import ReduxThunk from 'redux-thunk'
import logger from 'redux-logger'

export default createStore(rootReducer, applyMiddleware(ReduxThunk, logger))
