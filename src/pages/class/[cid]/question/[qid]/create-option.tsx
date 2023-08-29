import { CreateOptionParams, CreateOptionResults } from '@api/createOption'
import { LoadOptionsParams, LoadOptionsResults } from '@api/loadOptions'
import { FillButton } from '@components/basic/button/Fill'
import { OptionButton } from '@components/basic/button/Option'
import { RadioInput } from '@components/basic/input/Radio'
import { TextInput } from '@components/basic/input/Text'
import { Label } from '@components/basic/Label'
import { Divider } from '@components/Divider'
import { OptionHelper } from '@components/OptionHelper'
import { Required } from '@components/Required'
import { Sheet } from '@components/Sheet'
import { Option } from '@server/db/option'
import { QStem } from '@server/db/qstem'
import { request } from '@utils/api'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { CONDITION } from 'src/constants/conditions'
import { useAPILoading } from 'src/hooks/useButton'
import { useQueryParam } from 'src/hooks/useQueryParam'

export default function Page() {
  const { isLoading: onSubmitIsLoading, callAPI: onSubmitHandleClick } = useAPILoading()
  const { push, query } = useRouter()
  const qid = query.qid as string | undefined
  const cid = query.cid as string | undefined
  const [ansList, setAnsList] = useState<Option[]>([])
  const [disList, setDistList] = useState<Option[]>([])
  const [qinfo, setQinfo] = useState<QStem>()
  const [option, setOption] = useState('')
  const [isAnswer, setIsAnswer] = useState(false)
  const [condition] = useQueryParam('c')
  const [callbackUrl] = useQueryParam('callbackUrl')

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
    //don't add qinfo in the dependencies of his useEffect it will create infinite loop
  }, [qid, setAnsList, setDistList, setQinfo])

  const submit = useCallback(async () => {
    if (option.trim().length === 0) {
      alert('Please enter an option')
      return
    }
    await onSubmitHandleClick<void>(async () => {
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
          push(`/class/${cid}?c=${condition}`)
        }
      }
    })
  }, [option, onSubmitHandleClick, cid, qid, isAnswer, callbackUrl, push, condition])

  return (
    <Sheet gap={0}>
      <Label color={'primaryMain'} size={0} marginBottom={8}>
        Topic
      </Label>
      <TextInput value={qinfo?.learningObjective ?? ''} disabled marginBottom={24} />
      <Label color={'primaryMain'} size={0} marginBottom={8}>
        Explanation
      </Label>
      <TextInput value={qinfo?.explanation ?? ''} disabled marginBottom={24} />
      <Label color={'primaryMain'} size={0} marginBottom={8}>
        Question
      </Label>
      <TextInput value={qinfo?.stem_text ?? ''} disabled marginBottom={24} />
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
      <Divider marginVertical={24} />

      <Label color={'primaryMain'} size={0} marginBottom={8}>
        Add an Option <Required />
      </Label>

      <RadioInput options={['Answer', 'Distractor']} value={isAnswer ? 0 : 1} onSelect={i => setIsAnswer(i === 0)} />

      <TextInput
        placeholder={`Suggest ${isAnswer ? 'an answer' : 'a distractor'} for this question`}
        onChange={setOption}
        value={option}
        marginTop={8}
      />

      {[CONDITION.AIOnly, CONDITION.ModularAI].some(c => c === condition) && (
        <OptionHelper qinfo={qinfo} cid={cid} isAnswer={isAnswer} disList={disList} ansList={ansList} option={option} />
      )}

      <FillButton onClick={submit} disabled={onSubmitIsLoading} marginTop={24}>
        Submit
      </FillButton>
    </Sheet>
  )
}
