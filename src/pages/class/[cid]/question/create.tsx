import { FillBtn } from '@components/basic/button/Button'
import { Label } from '@components/basic/Label'
import { TextEditor } from '@components/TextEditor'
import styled from '@emotion/styled'
import { palette } from '@styles/theme'
import { request } from '@utils/api'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import { CreateQStemParams, CreateQStemResults } from '@api/question/createQStem'
import { CreateOptionParams, CreateOptionResults } from '@api/createOption'

export default function Page() {
  const { push, query } = useRouter()
  const cid = query.cid as string | undefined
  const [answer, setAnswer] = useState('')
  const [objective, setObjective] = useState('')
  const [explanation, setExplanation] = useState('')
  const [question, setQuestion] = useState('')

  const submitStem = useCallback(async () => {
    if (question.trim().length === 0) {
      alert('Please enter a question.')
      return
    }
    if (answer.trim().length === 0) {
      alert('Please enter an answer.')
      return
    }
    if (objective.trim().length === 0) {
      alert('Please enter a learning objective.')
      return
    }

    if (cid) {
      const res = await request<CreateQStemParams, CreateQStemResults>(`question/qstem/create`, {
        qstemObj: {
          stem_text: question,
          explanation,
          action_verb: [],
          keyword: [],
          cid,
          options: [],
          optionSets: [],
          learning_objective: objective,
        },
      })
      if (res) {
        await request<CreateOptionParams, CreateOptionResults>(`question/option/create`, {
          optionData: {
            option_text: answer,
            is_answer: true,
            explanation,
            class: cid,
            qstem: res.data,
            keywords: [],
          },
          similarOptions: [],
        })

        push('/' + cid + '/question/' + res.data + '/createOption')
      }
    }
  }, [cid, question, explanation, objective, answer, push])

  return (
    <CreateQBox>
      <div>
        <Label text="Learning Objective" color="blue" size={0} />
        <TextEditor placeholder="Objective" value={objective} onChange={setObjective} />
      </div>
      <div>
        <Label text="Question Stem" color="blue" size={0} />
        <TextEditor value={question} onChange={setQuestion} />
      </div>
      <div>
        <Label text="Explanation" color="blue" size={0} />
        <TextEditor value={explanation} onChange={setExplanation} />
      </div>
      <div>
        <Label text="Answer" color="blue" size={0} />
        <TextEditor placeholder="Suggest an answer" value={answer} onChange={setAnswer} />
      </div>
      <FillBtn onClick={submitStem}>Submit</FillBtn>
    </CreateQBox>
  )
}

const CreateQBox = styled.div`
  background-color: ${palette.common.white};
  padding: 30px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin: 30px 0 30px 0;
`
