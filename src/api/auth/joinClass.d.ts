export interface JoinClassParams {
  code: string
  _id: string
}

export interface JoinClassResults {
  msg: string
  success: boolean
  cid?: string
  cType?: boolean
}
