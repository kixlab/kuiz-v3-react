export interface CheckIsInClassParams {
  uid: string
  cid: string
}

export interface CheckIsInClassResults {
  inclass: boolean
  cid: string | undefined
  enrolled: boolean
  valid: boolean
}
