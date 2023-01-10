import { combineReducers } from 'redux'
import errorReducer from '../features/errorSlice'

export const reducers = combineReducers({
  error: errorReducer,
})
