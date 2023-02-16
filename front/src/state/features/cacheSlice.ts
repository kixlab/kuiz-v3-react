import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { qinfoType } from '../../apiTypes/qinfo'
import { optionType } from '../../apiTypes/option'
import { clusterType } from '../../apiTypes/cluster'

interface Question {
  qid: string
  question: qinfoType
  options: optionType[]
  answerCluster: clusterType[]
  distractorCluster: clusterType[]
}

interface Cache {
  qList: qinfoType[]
  visitedQuestions: Question[]
}

const initialState: Cache = {
  qList: [],
  visitedQuestions: [],
}

export const cacheSlice = createSlice({
  name: 'cache',
  initialState,
  reducers: {
    addQList: (state, action: PayloadAction<Cache['qList']>) => {
      for (let i = 0; i < action.payload.length; i++) {
        state.qList.push(action.payload[i])
      }
    },
    removeQList: state => {
      for (let i = 0; i < state.qList.length; i++) {
        state.visitedQuestions.pop()
      }
    },
    addVisitedProblem: (state, action: PayloadAction<Question>) => {
      state.visitedQuestions.push(action.payload)
    },
    removeVisitedProblems: state => {
      for (let i = 0; i < state.visitedQuestions.length; i++) {
        state.visitedQuestions.pop()
      }
    },
  },
})

export const { addQList, removeQList, addVisitedProblem, removeVisitedProblems } = cacheSlice.actions
export const cacheReducer = cacheSlice.reducer
