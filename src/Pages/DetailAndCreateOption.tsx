import styled from '@emotion/styled'
import { OptionBtn } from '../Components/basic/button/OptionButton'
import { Label } from '../Components/basic/Label'
import { CreateNewOption } from '../Components/CreateNewOption'
import { useState, useEffect, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../state/store'
import draftToHtml from 'draftjs-to-html'
import { qinfoType } from '../apiTypes/qinfo'
import { optionType } from '../apiTypes/option'
import ObjectID from 'bson-objectid'
import { Post, Get } from '../utils/apiRequest'
import { OptionCreateParams, OptionCreateResults } from '../api/question/option/optionCreate'
import { LoadOptionsParams, LoadOptionsResults } from '../api/question/option/loadOptions'

export function DetailAndCreateOption() {
  const navigate = useNavigate()
  const qid = useParams().id
  const cid = useParams().cid
  const uid = useSelector((state: RootState) => state.userInfo._id)
  const [ansList, setAnsList] = useState<optionType[]>([])
  const [disList, setDistList] = useState<optionType[]>([])
  const [qinfo, setQinfo] = useState<qinfoType>()
  const [similarOptions, setSimilarOptions] = useState<string[]>([])

  // My option values
  const [option, setOption] = useState('')
  const [isAnswer, setIsAnswer] = useState(false)
  const [keywords, setKeywords] = useState<string[]>([])

  useEffect(() => {
    Get<LoadOptionsParams, LoadOptionsResults>(`${process.env.REACT_APP_BACK_END}/question/option/load`, {
      qid: qid,
    }).then((res: LoadOptionsResults | null) => {
      if (res) {
        const ans = res.options.filter((op: optionType) => op.is_answer === true)
        const dis = res.options.filter((op: optionType) => op.is_answer === false)

        setAnsList(ans)
        setDistList(dis)
        setQinfo(res.qinfo)
      }
    })
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
        ansList.map((item: optionType) => {
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
        res && navigate('/' + cid)
      })
  }, [cid, isAnswer, keywords, navigate, option, qid, similarOptions, uid])

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
