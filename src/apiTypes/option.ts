export interface optionType {
  author: string
  class: string
  dependency: {
    same: string[]
    contradictory: string[]
    _id: string
  }
  disjointSet: string
  disliked: string[]
  explanation: string
  includedSet: string[]
  is_answer: boolean
  keyWords: string[]
  liked: string[]
  option_text: string
  plausible: {
    similar: string[]
    difference: string[]
    _id: string
  }
  qstem: string
  suggesetions: string[]
  __v: number
  _id: string
}
