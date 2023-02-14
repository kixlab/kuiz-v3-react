import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { qinfoType } from '../../apiTypes/qinfo'

export interface QListState {
  qinfo: qinfoType[]
}

const initialState: QListState = {
  qinfo: [],
}

export const qinfoSlice = createSlice({
  name: 'qinfo',
  initialState,
  reducers: {
    addQList: (state, action: PayloadAction<QListState>) => {
      state.qinfo = action.payload.qinfo
    },
    removeQList: state => {
      state.qinfo = []
    },
  },
})

export const { addQList, removeQList } = qinfoSlice.actions
export const qListReducer = qinfoSlice.reducer
