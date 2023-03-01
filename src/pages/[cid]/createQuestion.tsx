import { FillBtn } from '@components/basic/button/Button'
import { TextInput } from '@components/basic/InputBox'
import { Label } from '@components/basic/Label'
import { TextEditor } from '@components/TextEditor'
import styled from '@emotion/styled'
import { RootState } from '@redux/store'
import { palette } from '@styles/theme'
import { request } from '@utils/api'
import { convertToRaw, EditorState } from 'draft-js'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { CreateQStemParams, CreateQStemResults } from '../api/question/createQStem'
import { OptionCreateParams, OptionCreateResults } from '../api/question/option/optionCreate'

export default function Page() {
  const { push, query } = useRouter()
  const cid = query.cid as string | undefined
  const uid = useSelector((state: RootState) => state.userInfo._id)
  const [answer, setAnswer] = useState('')
  const [objective, setObjective] = useState('')
  const [explanation, setExplanation] = useState<EditorState>(() => EditorState.createEmpty())
  const [question, setQuestion] = useState<EditorState>(() => EditorState.createEmpty())

  function updateObjective(e: React.ChangeEvent<HTMLInputElement>) {
    setObjective(e.target.value)
  }

  function updateAnswer(e: React.ChangeEvent<HTMLInputElement>) {
    setAnswer(e.target.value)
  }

  const submitStem = useCallback(() => {
    const qstemObj = cid && {
      uid,
      stem_text: JSON.stringify(convertToRaw(question.getCurrentContent())),
      raw_string: question.getCurrentContent().getPlainText('\u0001'),
      explanation: JSON.stringify(convertToRaw(explanation.getCurrentContent())),
      action_verb: [],
      keyword: [],
      cid,
      options: [],
      optionSets: [],
      learning_objective: objective,
    }

    const rawString = qstemObj && (qstemObj.raw_string as string)
    const wordcount = rawString && rawString.split(' ').filter(word => word !== '').length
    if (wordcount && (rawString === null || wordcount < 1)) {
      alert('Please enter a question.')
      return
    }
    if (answer === null || answer.match(/^\s*$/) !== null || answer.length === 0) {
      alert('Please enter an answer.')
      return
    }
    if (qstemObj && (qstemObj.learning_objective === null || qstemObj.learning_objective.length === 0)) {
      alert('Please enter learning objective.')
      return
    }
    qstemObj &&
      request<CreateQStemParams, CreateQStemResults>(`question/qstem/create`, {
        qstemObj,
        cid,
      })
        .then((res: CreateQStemResults | null) => {
          if (res) {
            cid &&
              request<OptionCreateParams, OptionCreateResults>(`question/option/create`, {
                optionData: {
                  author: uid,
                  option_text: answer,
                  is_answer: true,
                  explanation: JSON.stringify(convertToRaw(explanation.getCurrentContent())),
                  class: cid,
                  qstem: res.data,
                  keywords: [],
                },
                similarOptions: [],
              })
          }
          return res
        })
        .then((res: CreateQStemResults | null) => res && push('/' + cid + '/question/' + res.data + '/createOption'))
  }, [cid, uid, question, explanation, objective, answer, push])

  return (
    <CreateQBox>
      <div>
        <Label text="Learning Objective" color="blue" size={0} />
        <TextInput placeholder="Objective" onChange={updateObjective} />
      </div>
      <div>
        <Label text="Question Stem" color="blue" size={0} />
        <TextEditor editorState={question} onChange={setQuestion} />
      </div>
      <div>
        <Label text="Explanation" color="blue" size={0} />
        <TextEditor editorState={explanation} onChange={setExplanation} />
      </div>
      <div>
        <Label text="Answer" color="blue" size={0} />
        <TextInput placeholder="Suggest an answer" onChange={updateAnswer} />
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
