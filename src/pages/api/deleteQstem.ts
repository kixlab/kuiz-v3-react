import { Option } from '@server/db/option'
import { optionService } from '@server/services/option'
import { apiController } from '@utils/api'
import { Types } from 'mongoose'
import { ID } from 'src/types/common'

export interface DeleteQstemParams {
  qid: ID
}

export interface DeleteQstemResults {}

export default apiController<DeleteQstemParams, DeleteQstemResults>(async ({ qid }, user) => {
  return {}
})
