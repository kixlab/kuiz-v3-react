import { OptionBtn } from '@components/basic/button/OptionButton'
import { Label } from '@components/basic/Label'
import { CreateNewOption } from '@components/CreateNewOption'
import styled from '@emotion/styled'
import { RootState } from '@redux/store'
import { Option } from '@server/db/option'
import { QStem } from '@server/db/qstem'
import { request } from '@utils/api'
import draftToHtml from 'draftjs-to-html'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { LoadOptionsParams, LoadOptionsResults } from 'src/pages/api/question/option/loadOptions'
import { OptionCreateParams, OptionCreateResults } from 'src/pages/api/question/option/optionCreate'

export default function Page() {
  const { push, query } = useRouter()
  const qid = query.id as string | undefined
  const cid = query.cid as string | undefined
  const uid = useSelector((state: RootState) => state.userInfo._id)
  const [ansList, setAnsList] = useState<Option[]>([])
  const [disList, setDistList] = useState<Option[]>([])
  const [qinfo, setQinfo] = useState<QStem>()
  const [similarOptions, setSimilarOptions] = useState<string[]>([])

  // My option values
  const [option, setOption] = useState('')
  const [isAnswer, setIsAnswer] = useState(false)
  const [keywords, setKeywords] = useState<string[]>([])

  useEffect(() => {
    if (qid) {
      request<LoadOptionsParams, LoadOptionsResults>(`question/option/load`, {
        qid,
      }).then(res => {
        if (res) {
          const ans = res.options.filter(op => op.is_answer === true)
          const dis = res.options.filter(op => op.is_answer === false)

          setAnsList(ans)
          setDistList(dis)
          setQinfo(res.qinfo)
        }
      })
    }
  }, [push, qid, setAnsList, setDistList, setQinfo])

  const submit = useCallback(() => {
    const optionData = cid &&
      qid && {
        author: uid,
        option_text: option,
        is_answer: isAnswer,
        explanation: '',
        class: cid,
        qstem: qid,
        keywords: keywords,
      }

    if (keywords.length > 0 && option.length > 0) {
      if (keywords.includes('Form similar to answer')) {
        ansList.forEach(item => {
          if (!similarOptions.includes(item._id)) {
            setSimilarOptions([item._id, ...similarOptions])
          }
        })
      }
    }

    optionData &&
      request<OptionCreateParams, OptionCreateResults>(`question/option/create`, {
        optionData,
        similarOptions: similarOptions,
      }).then((res: OptionCreateResults | null) => {
        res && push('/' + cid)
      })
  }, [ansList, cid, isAnswer, keywords, push, option, qid, similarOptions, uid])

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
        {ansList.map((item, i) => (
          <OptionBtn key={i} state={true} selected={false}>
            ✅{item?.option_text}
          </OptionBtn>
        ))}
        {disList.map((item, i) => (
          <OptionBtn key={i} state={true} selected={false}>
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
