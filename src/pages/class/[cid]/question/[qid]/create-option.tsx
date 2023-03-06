import { OptionBtn } from '@components/basic/button/OptionButton'
import { Label } from '@components/basic/Label'
import { CreateNewOption } from '@components/CreateNewOption'
import styled from '@emotion/styled'
import { Option } from '@server/db/option'
import { QStem } from '@server/db/qstem'
import { request } from '@utils/api'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { LoadOptionsParams, LoadOptionsResults } from '@api/loadOptions'
import { CreateOptionParams, CreateOptionResults } from '@api/createOption'
import { typography, palette } from '@styles/theme'

export default function Page() {
  const { push, query } = useRouter()
  const qid = query.qid as string | undefined
  const cid = query.cid as string | undefined
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
      request<LoadOptionsParams, LoadOptionsResults>(`loadOptions`, {
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

  const submit = useCallback(async () => {
    if (cid && qid) {
      const optionData = {
        option_text: option,
        is_answer: isAnswer,
        explanation: '',
        class: cid,
        qstem: qid,
        keywords,
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

      await request<CreateOptionParams, CreateOptionResults>(`createOption`, {
        optionData,
        similarOptions: similarOptions,
      })
      push('/' + cid)
    }
  }, [ansList, cid, isAnswer, keywords, push, option, qid, similarOptions])

  return (
    <QuestionBox>
      {qinfo && (
        <>
          <Section>
            <Label text="Learning Objective" color="blue" size={0} />
            <SectionText>{qinfo.learning_objective}</SectionText>
          </Section>
          <Section>
            <Label text="Explanation" color="blue" size={0} />
            <SectionText>{JSON.parse(qinfo.explanation).blocks[0].text}</SectionText>
          </Section>
          <DividerLine />
          <Section>
            <SectionText>{JSON.parse(qinfo.stem_text).blocks[0].text}</SectionText>
          </Section>
        </>
      )}

      <div>
        {ansList.map((item, i) => (
          <OptionBtn key={i} state={true} selected={false}>
            <div>✅</div>
            {item?.option_text}
          </OptionBtn>
        ))}
        {disList.map((item, i) => (
          <OptionBtn key={i} state={true} selected={false}>
            <div>❌</div>
            {item?.option_text}
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
  margin: 20px 0;
`

const DividerLine = styled.hr`
  border: 0;
  height: 1px;
  background-color: #dbdbdb;
  margin: 30px 0 20px 0;
`

const SectionText = styled.div`
  ${typography.b02};
`
