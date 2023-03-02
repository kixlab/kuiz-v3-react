import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserInfoType {
  name: string
  email: string
  img?: string
  isLoggedIn: boolean
  isAdmin: boolean
  classes: { name: string; cid: string }[]
  made: string[]
  madeOptions: string[]
  solved: string[]
}

export const userSlice = createSlice({
  name: 'userInfo',
  initialState: {
    name: '',
    email: '',
    img: '',
    isLoggedIn: false,
    isAdmin: false,
    classes: [],
    made: [],
    madeOptions: [],
    solved: [],
  } as UserInfoType,
  reducers: {
    login: (state: UserInfoType, action: PayloadAction<UserInfoType>) => {
      state.name = action.payload.name
      state.email = action.payload.email
      state.img = action.payload.img
      state.isLoggedIn = action.payload.isLoggedIn
      state.isAdmin = action.payload.isAdmin
      state.classes = action.payload.classes
      state.made = action.payload.made
      state.madeOptions = action.payload.madeOptions
      state.solved = action.payload.solved
    },
    logout: (state: UserInfoType) => {
      state.name = ''
      state.email = ''
      state.img = ''
      state.isLoggedIn = false
      state.isAdmin = false
      state.classes = []
      state.made = []
      state.madeOptions = []
      state.solved = []
    },
    enroll: (state: UserInfoType, action: PayloadAction<{ name: string; cid: string }>) => {
      if (state.isLoggedIn) {
        state.classes.push(action.payload)
      }
    },
  },
})

export const { login, logout, enroll } = userSlice.actions
export const userReducer = userSlice.reducer
