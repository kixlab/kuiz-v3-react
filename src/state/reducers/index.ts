import { combineReducers } from "redux"
import { errorReducer } from './errorReducer'

export const reducers = combineReducers({
	error: errorReducer
})
