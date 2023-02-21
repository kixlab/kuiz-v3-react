import styled from '@emotion/styled'
import { FillBtn } from '../Components/basic/button/Button'
import { TextEditor } from '../Components/TextEditor'
import { Label } from '../Components/basic/Label'
import { useCallback, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { EditorState, convertToRaw } from 'draft-js'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../state/store'
import { palette } from '../styles/theme'
import ObjectID from 'bson-objectid'
import { Post } from '../utils/apiRequest'
import { TextInput } from '../Components/basic/InputBox'
import { CreateQStemParams, CreateQStemResults } from '../api/question/createQStem'
import { OptionCreateParams, OptionCreateResults } from '../api/question/option/optionCreate'
import { removeUserMadeQuestions } from '../state/features/cacheSlice'

export function CreateQuestion() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cid = useParams().cid
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
      uid: ObjectID(uid),
      stem_text: JSON.stringify(convertToRaw(question.getCurrentContent())),
      raw_string: question.getCurrentContent().getPlainText('\u0001'),
      explanation: JSON.stringify(convertToRaw(explanation.getCurrentContent())),
      action_verb: [],
      keyword: [],
      cid: ObjectID(cid),
      options: [],
      optionSets: [],
      learning_objective: objective,
    }

    const rawString = qstemObj && qstemObj.raw_string
    const wordcount = rawString && rawString.split(' ').filter(word => word !== '').length
    if (rawString === null || rawString?.length === 0 || wordcount === null || (wordcount && wordcount <= 0)) {
      alert('Please enter a question.')
      return
    }
    if (
      explanation === null ||
      convertToRaw(explanation.getCurrentContent()).blocks[0].text.replace(/\s/g, '').length === 0
    ) {
      alert('Please enter an explanation for how to solve the question.')
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
      Post<CreateQStemParams, CreateQStemResults>(`${process.env.REACT_APP_BACK_END}/question/qstem/create`, {
        qstemObj: qstemObj,
        cid: cid,
      })
        .then((res: CreateQStemResults | null) => {
          if (res) {
            cid &&
              Post<OptionCreateParams, OptionCreateResults>(
                `${process.env.REACT_APP_BACK_END}/question/option/create`,
                {
                  optionData: {
                    author: ObjectID(uid),
                    option_text: answer,
                    is_answer: true,
                    explanation: JSON.stringify(convertToRaw(explanation.getCurrentContent())),
                    class: ObjectID(cid),
                    qstem: ObjectID(res.data),
                    keywords: [],
                  },
                  similarOptions: [],
                }
              )
          }
          return res
        })
        .then((res: CreateQStemResults | null) => {
          if (res) {
            dispatch(removeUserMadeQuestions())
            navigate('/' + cid + '/question/' + res.data + '/createOption')
          }
        })
  }, [uid, cid, answer, objective, question, explanation, removeUserMadeQuestions])

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
