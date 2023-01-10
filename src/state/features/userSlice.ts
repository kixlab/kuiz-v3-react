import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type userInfoType = {
  name: string
  email: string
  img?: string
  isLoggedIn: boolean
}

const initialState: userInfoType = {
  name: '',
  email: '',
  isLoggedIn: false,
}

export const userSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    login: (state: userInfoType, action: PayloadAction<userInfoType>) => {
      state = action.payload
    },
    logout: (state: userInfoType) => {
      state.name = ''
      state.email = ''
      state.img = ''
      state.isLoggedIn = false
    },
  },
})

export const { login, logout } = userSlice.actions
export const currentUser = (state: userInfoType) => state
export const userReducer = userSlice.reducer
