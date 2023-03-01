import { combineReducers } from 'redux'
import { errorReducer } from '../features/errorSlice'
import { userReducer } from '../features/userSlice'

const rootReducer = combineReducers({
  error: errorReducer,
  userInfo: userReducer,
})

export default rootReducer
