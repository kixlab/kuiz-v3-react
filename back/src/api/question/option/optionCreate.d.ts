import { Option } from '../../../db/option'
import { ID } from '../../../types/common'

export interface OptionCreateParams {
  optionData: {
    author: ID
    option_text: string
    is_answer: boolean
    explanation: string
    class: ID
    qstem: ID
    keywords: string[]
  }
  similarOptions: ID[]
}

export interface OptionCreateResults {
  option: Option
}
