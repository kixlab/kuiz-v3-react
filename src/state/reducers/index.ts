import { combineReducers } from 'redux'
import errorReducer from '../features/errorSlice'
import { userReducer } from '../features/userSlice'

export const rootReducer = combineReducers({
  error: errorReducer,
  userInfo: userReducer,
})
