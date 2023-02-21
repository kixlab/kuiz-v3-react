import styled from '@emotion/styled'
import { OptionBtn } from '../Components/basic/button/OptionButton'
import { Label } from '../Components/basic/Label'
import { CreateNewOption } from '../Components/CreateNewOption'
import { useState, useEffect, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../state/store'
import draftToHtml from 'draftjs-to-html'
import { qinfoType } from '../apiTypes/qinfo'
import { optionType } from '../apiTypes/option'
import ObjectID from 'bson-objectid'
import { Post, Get } from '../utils/apiRequest'
import { OptionCreateParams, OptionCreateResults } from '../api/question/option/optionCreate'
import { LoadOptionsParams, LoadOptionsResults } from '../api/question/option/loadOptions'
import { removeQList } from '../state/features/cacheSlice'
import { addVisitedOptions, removeVisitedOptions, removeUserMadeOptions } from '../state/features/cacheSlice'

export function DetailAndCreateOption() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const qid = useParams().id
  const cid = useParams().cid
  const uid = useSelector((state: RootState) => state.userInfo._id)
  const [ansList, setAnsList] = useState<optionType[]>([])
  const [disList, setDistList] = useState<optionType[]>([])
  const [qinfo, setQinfo] = useState<qinfoType>()
  const [similarOptions, setSimilarOptions] = useState<string[]>([])
  const visitedQuestions = useSelector((state: RootState) => state.cache.visitedQuestions)
  const visitedOptions = useSelector((state: RootState) => state.cache.visitedOptions)
  const [isVisited, setIsVisited] = useState(false)

  // My option values
  const [option, setOption] = useState('')
  const [isAnswer, setIsAnswer] = useState(false)
  const [keywords, setKeywords] = useState<string[]>([])

  useEffect(() => {
    for (const visitedOption of visitedOptions) {
      if (visitedOption.qid === qid) {
        setIsVisited(true)
        setAnsList(visitedOption.answers)
        setDistList(visitedOption.distractors)
        setQinfo(visitedOption.question)
        break
      }
    }
    if (isVisited === false) {
      for (const visitedQuestion of visitedQuestions) {
        if (visitedQuestion.qid === qid) {
          setIsVisited(true)
          const answer = []
          const distractor = []
          for (const ans of visitedQuestion.answerCluster) {
            answer.push(ans.options[0])
          }
          for (const dis of visitedQuestion.distractorCluster) {
            distractor.push(dis.options[0])
          }
          setAnsList(answer)
          setDistList(distractor)
          setQinfo(visitedQuestion.question)
          break
        }
      }
    }
    if (isVisited === false) {
      Get<LoadOptionsParams, LoadOptionsResults>(`${process.env.REACT_APP_BACK_END}/question/option/load`, {
        qid: qid,
      }).then(res => {
        if (res) {
          const ans = res.options.filter((op: optionType) => op.is_answer === true)
          const dis = res.options.filter((op: optionType) => op.is_answer === false)
          setAnsList(ans)
          setDistList(dis)
          setQinfo(res.qinfo)
          qid && dispatch(addVisitedOptions({ qid: qid, question: res.qinfo, answers: ans, distractors: dis }))
        }
      })
    }
  }, [navigate, qid, setAnsList, setDistList, setQinfo])

  const submit = useCallback(() => {
    const optionData = cid &&
      qid && {
        author: ObjectID(uid),
        option_text: option,
        is_answer: isAnswer,
        explanation: '',
        class: ObjectID(cid),
        qstem: ObjectID(qid),
        keywords: keywords,
      }

    if (keywords.length > 0 && option.length > 0) {
      if (keywords.includes('Form similar to answer')) {
        ansList.forEach((item: optionType) => {
          if (!similarOptions.includes(item._id)) {
            setSimilarOptions([item._id, ...similarOptions])
          }
        })
      }
    }

    optionData &&
      Post<OptionCreateParams, OptionCreateResults>(`${process.env.REACT_APP_BACK_END}/question/option/create`, {
        optionData: optionData,
        similarOptions: similarOptions,
      }).then((res: OptionCreateResults | null) => {
        dispatch(removeQList())
        dispatch(removeUserMadeOptions())
        dispatch(removeVisitedOptions())
        res && navigate('/' + cid)
      })
  }, [ansList, cid, isAnswer, keywords, navigate, option, qid, similarOptions, uid])

  return (
    <QuestionBox>
      {qinfo && (
        <>
          <Section>
            <Label text="Learning Objective" color="blue" size={0} />
            <div>{qinfo.learning_objective}</div>
          </Section>
          <Section>
            <Label text="Explanation" color="blue" size={0} />
            <div dangerouslySetInnerHTML={{ __html: draftToHtml(JSON.parse(qinfo.explanation)) }} />
          </Section>
          <DividerLine />
          <div dangerouslySetInnerHTML={{ __html: draftToHtml(JSON.parse(qinfo.stem_text)) }} />
        </>
      )}

      <div>
        {ansList.map((item: optionType) => (
          <OptionBtn key={item._id} state={true} selected={false}>
            ✅{item?.option_text}
          </OptionBtn>
        ))}
        {disList.map((item: optionType) => (
          <OptionBtn key={item._id} state={true} selected={false}>
            ❌{item?.option_text}
          </OptionBtn>
        ))}
      </div>
      <DividerLine />
      <CreateNewOption
        isAnswer={isAnswer}
        setIsAnswer={setIsAnswer}
        setOption={setOption}
        setKeywords={setKeywords}
        onSubmit={submit}
      />
    </QuestionBox>
  )
}

const QuestionBox = styled.div`
  border-radius: 8px;
  background-color: white;
  margin: 40px 0 40px 0;
  padding: 10px 30px 30px 30px;
`

const Section = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`

const DividerLine = styled.hr`
  border: 0;
  height: 1px;
  background-color: #dbdbdb;
  margin: 30px 0 20px 0;
`
