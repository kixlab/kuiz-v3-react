import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
//Reducers
import { errorReducer } from '../features/errorSlice'
import { userReducer } from '../features/userSlice'
import { qListReducer } from '../features/qListSlice'

const rootReducer = combineReducers({
  error: errorReducer,
  userInfo: userReducer,
  qList: qListReducer,
})

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['userInfo'],
}

export default persistReducer(persistConfig, rootReducer)
