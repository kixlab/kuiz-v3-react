import { ID } from '../types/common'

export interface LoadClassTopicsParams {
  cid: ID
}

export interface LoadClassTopicsResults {
  topics: string[]
}
