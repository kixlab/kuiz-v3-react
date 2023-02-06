import { Types } from 'mongoose'
import { CreateFullQuestionParams, CreateFullQuestionResults } from '../../api/question/createFullQuestion'
import { ClassModel } from '../../db/class'
import { OptionModel } from '../../db/option'
import { QStemModel } from '../../db/qstem'
import { UserModel } from '../../db/user'
import { optionService } from '../../services/option'
import { qStemService } from '../../services/qStem'
import { Post } from '../methods'

export const createFullQuestion = Post<CreateFullQuestionParams, CreateFullQuestionResults>(
  async ({ optionList, qinfo, cid, explanation }) => {
    /*
    logic
    - 불러올 것 : option List(어떤 index가 정답인지에 대한 정보), question Info(author, qstem HTML, qstem string, class), 
    - option들을 저장한다
    - option Set에 option id를 정답 option id와 함께 저장한다
    - qstem object를 만들어 qstem에 저장한다
    - class와 user info에 qstem을 push 해준다. 
    */

    const question = await qStemService.create({
      uid: qinfo.authorId,
      cid,
      stem_text: qinfo.authorId,
      raw_string: qinfo.authorId,
      learning_objective: qinfo.authorId,
      explanation: qinfo.authorId,
    })

    const savedOptions = await Promise.all(
      optionList.map(async ({ option_text, is_answer }) => {
        const option = await optionService.create({
          uid: new Types.ObjectId(qinfo.authorId),
          cid: new Types.ObjectId(cid),
          qid: question.id,
          isAnswer: is_answer,
          optionText: option_text,
        })
        return option.id
      })
    )

    QStemModel.findByIdAndUpdate(question.id, { options: savedOptions })

    return {
      question,
    }
  }
)
