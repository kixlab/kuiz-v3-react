import { CreateOptionParams, CreateOptionResults } from '@api/createOption'
import { getQuestionTopicParams, getQuestionTopicResults } from '@api/getQuestionTopic'
import { LoadOptionsParams, LoadOptionsResults } from '@api/loadOptions'
import { FillButton } from '@components/basic/button/Fill'
import { OptionButton } from '@components/basic/button/Option'
import { TagButton } from '@components/basic/button/Tag'
import { TextInput } from '@components/basic/input/Text'
import { Label } from '@components/basic/Label'
import { CreateNewOption } from '@components/CreateNewOption'
import { Divider } from '@components/Divider'
import { Sheet } from '@components/Sheet'
import styled from '@emotion/styled'
import { Option } from '@server/db/option'
import { QStem } from '@server/db/qstem'
import { typography } from '@styles/theme'
import { request } from '@utils/api'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'

export default function Page() {
  const { push, query } = useRouter()
  const qid = query.qid as string | undefined
  const cid = query.cid as string | undefined
  const [ansList, setAnsList] = useState<Option[]>([])
  const [disList, setDistList] = useState<Option[]>([])
  const [qinfo, setQinfo] = useState<QStem>()
  const [similarOptions, setSimilarOptions] = useState<string[]>([])
  const [learningObjective, setLearningObjective] = useState('')

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
      request<getQuestionTopicParams, getQuestionTopicResults>(`getQuestionTopic`, {
        qid,
      }).then(res => {
        if (res) {
          setLearningObjective(res.learningObjective)
          console.log(res.learningObjective)
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
        learningObjective,
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
      push('/class/' + cid)
    }
  }, [ansList, cid, isAnswer, keywords, push, option, qid, similarOptions, learningObjective])

  return (
    <Sheet gap={0}>
      <Label color={'primaryMain'} size={0} marginBottom={8}>
        Topic
      </Label>
      <TextInput value={qinfo?.learningObjective ?? ''} disabled marginBottom={20} />
      <Label color={'primaryMain'} size={0} marginBottom={8}>
        Explanation
      </Label>
      <TextInput value={qinfo?.explanation ?? ''} disabled marginBottom={20} />
      <Label color={'primaryMain'} size={0} marginBottom={8}>
        Question
      </Label>
      <TextInput value={qinfo?.stem_text ?? ''} disabled marginBottom={20} />
      <Label color={'primaryMain'} size={0} marginBottom={8}>
        Options
      </Label>
      {ansList.map((item, i) => (
        <OptionButton key={i} state={true} selected={false}>
          <div>✅</div>
          {item?.option_text}
        </OptionButton>
      ))}
      {disList.map((item, i) => (
        <OptionButton key={i} state={true} selected={false}>
          <div>❌</div>
          {item?.option_text}
        </OptionButton>
      ))}
      <Divider marginVertical={20} />

      <Label color={'primaryMain'} size={0} marginBottom={8}>
        Add an Option
      </Label>
      <OptionTypeSelect>
        <TagButton onClick={() => setIsAnswer(true)} id={isAnswer ? 'AnsAct' : 'Ans'}>
          Answer
        </TagButton>
        <TagButton onClick={() => setIsAnswer(false)} id={!isAnswer ? 'DistAct' : 'Dist'}>
          Distractor
        </TagButton>
      </OptionTypeSelect>

      <TextInput
        placeholder="Suggest an answer or distractor for this question"
        onChange={setOption}
        value={option}
        marginTop={8}
        marginBottom={20}
      />

      <FillButton onClick={submit}>Submit</FillButton>
    </Sheet>
  )
}

const OptionTypeSelect = styled.div`
  display: grid;
  gap: 8px;
  grid-template-columns: 1fr 1fr;
`
