import { CreateOptionParams, CreateOptionResults } from '@api/createOption'
import { GetGPTDistractorsParams, GetGPTDistractorsResults } from '@api/getGPTDistractor'
import { LoadOptionsParams, LoadOptionsResults } from '@api/loadOptions'
import { FillButton } from '@components/basic/button/Fill'
import { OptionButton } from '@components/basic/button/Option'
import { StrokeButton } from '@components/basic/button/Stroke'
import { RadioInput } from '@components/basic/input/Radio'
import { TextInput } from '@components/basic/input/Text'
import { Label } from '@components/basic/Label'
import { Divider } from '@components/Divider'
import { Required } from '@components/Required'
import { Sheet } from '@components/Sheet'
import styled from '@emotion/styled'
import { Option } from '@server/db/option'
import { QStem } from '@server/db/qstem'
import { request } from '@utils/api'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'

export default function Page() {
  const { push, query } = useRouter()
  const qid = query.qid as string | undefined
  const cid = query.cid as string | undefined
  const LLMPath = query.path?.includes('LLM')
  const callbackUrl = query.callbackUrl as string | undefined
  const [ansList, setAnsList] = useState<Option[]>([])
  const [disList, setDistList] = useState<Option[]>([])
  const [qinfo, setQinfo] = useState<QStem>()
  const [option, setOption] = useState('')
  const [isAnswer, setIsAnswer] = useState(false)
  const [GPTSuggestedDistractors, setGPTSuggestedDistractors] = useState<string[]>([])

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

          LLMPath &&
            request<GetGPTDistractorsParams, GetGPTDistractorsResults>(`getGPTDistractor`, {
              qStem: res.qinfo.stem_text,
              qLearningObjective: res.qinfo.learningObjective,
            }).then(res => {
              res && setGPTSuggestedDistractors(res.distractors)
            })
        }
      })
    }
    //don't add qinfo in the dependencies of his useEffect it will create infinite loop
  }, [push, qid, setAnsList, setDistList, setQinfo, setGPTSuggestedDistractors, LLMPath])

  const submit = useCallback(async () => {
    if (option.trim().length === 0) {
      alert('Please enter an option')
      return
    }

    if (cid && qid) {
      const optionData = {
        option_text: option,
        is_answer: isAnswer,
        class: cid,
        qstem: qid,
        keywords: [],
      }

      await request<CreateOptionParams, CreateOptionResults>(`createOption`, {
        optionData,
        similarOptions: [],
      })
      if (callbackUrl) {
        push(callbackUrl)
      } else {
        push('/class/' + cid)
      }
    }
  }, [option, cid, qid, isAnswer, callbackUrl, push])

  const onTryLLMSuggestions = useCallback(() => {
    push(`/class/${cid}/question/${qid}/create-option/LLM?callbackUrl=${location.href}`)
  }, [cid, push, qid])

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
        ✅ Answers
      </Label>
      {ansList.map((item, i) => (
        <OptionButton key={i} state={true} selected={false} marginBottom={8}>
          {item?.option_text}
        </OptionButton>
      ))}
      {0 < disList.length && (
        <>
          <Label color={'primaryMain'} size={0} marginBottom={8} marginTop={12}>
            ❌ Distractors
          </Label>
          {disList.map((item, i) => (
            <OptionButton key={i} state={true} selected={false} marginBottom={i < disList.length - 1 ? 8 : 0}>
              {item?.option_text}
            </OptionButton>
          ))}
        </>
      )}
      <Divider marginVertical={20} />

      <Label color={'primaryMain'} size={0} marginBottom={8}>
        Add an Option <Required />
      </Label>

      <RadioInput options={['Answer', 'Distractor']} value={isAnswer ? 0 : 1} onSelect={i => setIsAnswer(i === 0)} />

      <TextInput
        placeholder="Suggest an answer or distractor for this question"
        onChange={setOption}
        value={option}
        marginTop={8}
      />
      {LLMPath && GPTSuggestedDistractors.length !== 0 ? (
        <>
          <Label color={'primaryMain'} size={0} marginTop={10}>
            Suggested Distractors
          </Label>
          <Container>
            {GPTSuggestedDistractors.map((item, i) => (
              <OptionButton
                key={i}
                state={true}
                selected={false}
                marginBottom={i < GPTSuggestedDistractors.length - 1 ? 8 : 0}
              >
                {item}
              </OptionButton>
            ))}
          </Container>
        </>
      ) : null}
      <Container>
        <FillButton onClick={submit}>Submit</FillButton>
        {!LLMPath && <StrokeButton onClick={onTryLLMSuggestions}>Try LLM Suggestions</StrokeButton>}
      </Container>
    </Sheet>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: baseline;
  gap: 10px;
  margin-top: 10px;
`
